export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|assets|api).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
}
