import React from "react"
import localFont from "next/font/local"
import { Providers } from "src/app/providers"
import { Inter, Noto_Sans } from "next/font/google"

import "~/globals.css"

const youthPower = localFont({
	src: [
		{
			path: "../public/fonts/YouthPower.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-youth-power",
})

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-noto" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" })

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={`${youthPower.variable}  ${inter.variable} ${notoSans.variable}`}>
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
