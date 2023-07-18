/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// grey
				light1: "#D3DCE6",
				light5: "#F9FAFC",
				// blue
				lighter: "#035AC5",
				darker: "#002859",
			},
		},
	},
	plugins: [require("rippleui"), require("@tailwindcss/typography")],
	rippleui: {
		removeThemes: ["dark"],
		themes: [
			{
				themeName: "light",
				colorScheme: "light",
				colors: {
					primary: "#0465DD",
					backgroundPrimary: "#FFFFFF",
				},
			},
		],
	},
};
