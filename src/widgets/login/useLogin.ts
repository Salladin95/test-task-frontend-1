import { gql } from "~/__generated__"
import { useMutation } from "@apollo/client"
import { LoginMutation } from "~/__generated__/graphql"

const LOGIN_MUTATION = gql(`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			access_token
			refresh_token
		}
	}
`)

export function useLoginMutation() {
	const [login, state] = useMutation<LoginMutation>(LOGIN_MUTATION)
	return { login, ...state }
}
