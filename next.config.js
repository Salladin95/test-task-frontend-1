// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		remotePatterns: [],
	},
	async rewrites() {
		return []
	},
}

module.exports = nextConfig
