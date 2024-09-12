import React from "react"
import { Providers } from "~/app/providers"
import { Inter, Noto_Sans } from "next/font/google"

import "~/globals.css"

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-noto" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={`${inter.variable} ${notoSans.variable}`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

export async function generateMetadata() {
	return {
		title: "",
		description: "",
	}
}
