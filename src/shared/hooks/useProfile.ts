import { gql } from "~/__generated__"
import { useQuery } from "@apollo/client"

const QUERY_PROFILE = gql(`
	query myProfile {
		myProfile {
			id
			email
			name
			role
			avatar
			creationAt
			updatedAt
		}
	}
`)

export function useProfile() {
	return useQuery(QUERY_PROFILE)
}
