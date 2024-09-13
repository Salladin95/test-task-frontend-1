import { gql } from "~/__generated__"
import { useMutation } from "@apollo/client"
import { RefreshTokenMutation } from "~/__generated__/graphql"

const REFRESH_MUTATION = gql(`
	mutation refreshToken($refreshToken: String!) {
		refreshToken(refreshToken: $refreshToken) {
			access_token
			refresh_token
		}
	}
`)

export function useRefreshMutation() {
	const [refreshToken, state] = useMutation<RefreshTokenMutation>(REFRESH_MUTATION)
	return { refreshToken, ...state }
}
