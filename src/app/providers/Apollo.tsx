"use client"
import React from "react"
import { config } from "~/app/config"
import { Token } from "~/shared/types"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { refreshToken as makeRefreshTokenCall } from "~/shared/api"
import { useLocalStoreToken } from "~/shared/hooks/useLocalStoreToken"
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider as Provider,
	createHttpLink,
	from,
	fromPromise,
	InMemoryCache,
} from "@apollo/client"

type SetTokenType = ReturnType<typeof useLocalStoreToken>[1]

/**
 * Adds the authorization token to the request headers if available.
 *
 * @param {Token | null} token - The user's current token (if available).
 * @returns {ApolloLink} - A link that attaches the token to request headers.
 */
const createAuthLink = (token?: Token | null): ApolloLink =>
	setContext((_, { headers }) => ({
		headers: {
			...headers,
			authorization: token ? `Bearer ${token.accessToken}` : "",
		},
	}))

/**
 * Refreshes the access token using the refresh token.
 *
 * @param {SetTokenType} setToken - Function to update the local token storage.
 * @param {string} refreshToken - The user's current refresh token.
 * @returns {Promise<Token | null>} - The new token or null if refreshing fails.
 */
const handleRefreshToken = async (setToken: SetTokenType, refreshToken: string): Promise<Token | null> => {
	try {
		const res = await makeRefreshTokenCall(refreshToken)
		const newToken = {
			accessToken: res.access_token,
			refreshToken: res.refresh_token,
		}
		setToken(newToken)
		return newToken
	} catch (error) {
		console.error("Failed to refresh token:", error)
		setToken(null)
		throw error
	}
}

/**
 * Handles 401 errors by attempting to refresh the token and retrying the failed request.
 *
 * @param {SetTokenType} setToken - Function to update the local token storage.
 * @param {Token | null} token - The user's current token (if available).
 * @returns {ApolloLink} - An error link that retries the request after refreshing the token.
 */
const createErrorLink = (setToken: SetTokenType, token?: Token | null): ApolloLink =>
	onError(({ graphQLErrors, operation, forward }) => {
		// Check if there are GraphQL errors, and if any of them indicate an UNAUTHENTICATED error.
		// Also, ensure that the token is available.
		const unauthenticatedError = graphQLErrors?.some((err) => err?.extensions?.code === "UNAUTHENTICATED" && token)

		// If an unauthenticated error occurred and the token exists, attempt to refresh the token.
		if (unauthenticatedError && token) {
			// Use fromPromise to handle the token refresh asynchronously.
			return (
				fromPromise(
					handleRefreshToken(setToken, token.refreshToken).then((newToken) => {
						// If token refresh fails or returns null, do not proceed.
						if (!newToken) return

						// Retrieve existing headers from the previous request context.
						const oldHeaders = operation.getContext().headers

						// Update the request headers with the newly refreshed token.
						operation.setContext(() => ({
							headers: {
								...oldHeaders,
								authorization: `Bearer ${newToken.accessToken}`,
							},
						}))

						// Retry the original operation with the new headers.
						return forward(operation)
					}),
				)
					// If token refresh succeeds, forward the updated operation.
					// Otherwise, attempt to forward the original request anyway.
					.flatMap((result) => result || forward(operation))
			)
		}
	})

/**
 * Initializes and returns a configured Apollo Client instance.
 */
const useClient = () => {
	const httpLink = createHttpLink({
		uri: config.graphql,
	})

	const [token, setToken] = useLocalStoreToken()
	const authLink = createAuthLink(token)
	const errorLink = createErrorLink(setToken, token)

	return new ApolloClient({
		link: from([authLink, errorLink, httpLink]),
		cache: new InMemoryCache(),
	})
}

/**
 * ApolloProvider component to wrap the application and provide an Apollo Client context.
 */
export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
	const client = useClient()
	return <Provider client={client}>{children}</Provider>
}
