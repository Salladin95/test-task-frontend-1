import { CodegenConfig } from "@graphql-codegen/cli"

const codegen: CodegenConfig = {
	// TODO: ADD TO DOT ENV
	schema: "https://api.escuelajs.co/graphql",
	documents: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
	generates: {
		"./src/__generated__/": {
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
