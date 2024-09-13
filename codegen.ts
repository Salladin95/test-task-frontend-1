import { config } from "~/app/config"
import { CodegenConfig } from "@graphql-codegen/cli"

const codegen: CodegenConfig = {
	schema: config.graphql,
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
