/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			screens: {
				xs: "320px",
				sm: "375px",
				md: "768px",
				lg: "1024px",
				xl: "1440px",
			},
		},
		colors: {
			black: "#000000",
			white: "#FFFFFF",
			red: "#CA3E35",
			transparent: "transparent",
			beige: "#F6F6F6",
			fontFamily: {
				noto: ["var(--font-noto)", "sans-serif"],
				inter: ["var(--font-inter)", "sans-serif"],
			},
			fontWeight: {
				regular: 400,
				medium: 500,
				"semi-bold": 600,
				bold: 700,
			},
			fontSize: {
				xs: ["14px", "130%"],
				sm: ["16px", "130%"],
				lg: ["20px", "130%"],
				"2xl": ["24px", "130%"],
				"3xl": ["28px", "130%"],
				"4xl": ["32px", "130%"],
				"5xl": ["36px", "130%"],
				"6xl": ["42px", "130%"],
			},
			screens: {
				xs: "320px",
				sm: "375px",
				md: "768px",
				lg: "1024px",
				xl: "1440px",
				"2xl": "1920px",
			},
		},
	},
}
