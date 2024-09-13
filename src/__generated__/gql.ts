/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
	"\n\tquery myProfile {\n\t\tmyProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\trole\n\t\t\tavatar\n\t\t\tcreationAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n":
		types.MyProfileDocument,
	"\n\tmutation login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n":
		types.LoginDocument,
	"\n\tmutation refreshToken($refreshToken: String!) {\n\t\trefreshToken(refreshToken: $refreshToken) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n":
		types.RefreshTokenDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n\tquery myProfile {\n\t\tmyProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\trole\n\t\t\tavatar\n\t\t\tcreationAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n",
): (typeof documents)["\n\tquery myProfile {\n\t\tmyProfile {\n\t\t\tid\n\t\t\temail\n\t\t\tname\n\t\t\trole\n\t\t\tavatar\n\t\t\tcreationAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"]
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n\tmutation login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n"]
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
	source: "\n\tmutation refreshToken($refreshToken: String!) {\n\t\trefreshToken(refreshToken: $refreshToken) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n",
): (typeof documents)["\n\tmutation refreshToken($refreshToken: String!) {\n\t\trefreshToken(refreshToken: $refreshToken) {\n\t\t\taccess_token\n\t\t\trefresh_token\n\t\t}\n\t}\n"]

export function gql(source: string) {
	return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
	infer TType,
	any
>
	? TType
	: never
