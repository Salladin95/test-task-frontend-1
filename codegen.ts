import { CodegenConfig } from "@graphql-codegen/cli"

const codegen: CodegenConfig = {
	schema: "https://api.escuelajs.co/graphql",
	documents: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
	generates: {
		"./__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
}
export default codegen
