"use client"
import React from "react"
import { Token } from "~/shared/types"
import { refreshToken } from "~/shared/api"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
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
 * Creates an Apollo Link that adds the authorization token to the headers.
 *
 * @param {Token | null} [token] - The user's current token (if available).
 * @returns {ApolloLink} - A context link that attaches the token to the request headers.
 */
function createAuthLink(token?: Token | null): ApolloLink {
	return setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token.accessToken}` : "",
			},
		}
	})
}

/**
 * Refreshes the user's access token using the provided refresh token mutation.
 *
 * @param {SetTokenType} setToken - Function to update the local token storage.
 * @param {string} token - The user's current refresh token.
 * @returns {Promise<Token | null>} - The new token or null if refreshing fails.
 */
async function handleRefreshToken(setToken: SetTokenType, token: string): Promise<Token | null> {
	try {
		const res = await refreshToken(token)
		const newToken = {
			accessToken: res.access_token,
			refreshToken: res.refresh_token,
		}
		setToken(newToken)
		return newToken
	} catch (error) {
		console.error("Failed to refresh token:", error)
		setToken(null)
		// TODO: SIGN OUT USER
		return null
	}
}

/**
 * Creates an Apollo error link that handles 401 (UNAUTHENTICATED) errors
 * by refreshing the token and retrying the failed operation.
 *
 * @param {SetTokenType} setToken - Function to update the local token storage.
 * @param {Token | null} [token] - The user's current token (if available).
 * @returns {ApolloLink} - An error link that retries the request after refreshing the token.
 */
function createErrorLink(setToken: SetTokenType, token?: Token | null): ApolloLink {
	return onError(({ graphQLErrors, operation, forward }) => {
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (err?.extensions?.code === "UNAUTHENTICATED" && token) {
					// Log for debugging
					console.log("UNAUTHENTICATED error, attempting to refresh token...")

					return fromPromise(
						handleRefreshToken(setToken, token.refreshToken)
							.then((newToken) => {
								if (newToken) {
									// Log for debugging
									console.log("Token refreshed successfully:", newToken)

									// Set new authorization header
									const oldHeaders = operation.getContext().headers
									operation.setContext({
										headers: {
											...oldHeaders,
											authorization: `Bearer ${newToken.accessToken}`,
										},
									})

									// Retry the request with the updated headers
									return forward(operation)
								} else {
									// Log for debugging
									console.log("Failed to refresh token.")
									return
								}
							})
							.catch((error) => {
								console.error("Error during token refresh:", error)
							}),
					).flatMap((result) => {
						if (result) {
							return result
						}
						// Optional: handle the case where the token refresh fails
						return forward(operation)
					})
				}
			}
		}
	})
}

/**
 * Initializes and returns a configured Apollo Client instance.
 */
function useClient() {
	const httpLink = createHttpLink({
		// TODO: extract to the .env
		uri: "https://api.escuelajs.co/graphql",
	})

	const [token, setToken] = useLocalStoreToken()

	const authLink = createAuthLink(token)
	const errorLink = createErrorLink(setToken, token)

	// Create Apollo Client instance
	return new ApolloClient({
		link: from([authLink, errorLink, httpLink]),
		cache: new InMemoryCache(),
	})
}

/**
 * ApolloProvider component to wrap the application and provide an Apollo Client context.
 */
export function ApolloProvider({ children }: { children: React.ReactNode }) {
	const client = useClient()
	return <Provider client={client}>{children}</Provider>
}
