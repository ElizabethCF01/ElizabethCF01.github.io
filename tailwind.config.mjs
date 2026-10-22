import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
				mono: ['"Space Mono"', ...defaultTheme.fontFamily.mono],
				// CRT on-screen display (channel number, OSD labels)
				tv: ['VT323', ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [
		// Breakpoints based on the TV screen's width (.screen-scroll is a size container),
		// not the window, so sections fit both the big TV and the pocket TV.
		({ addVariant }) => {
			addVariant('tv-sm', '@container screen (min-width: 30rem)');
			addVariant('tv-lg', '@container screen (min-width: 37.5rem)');
		},
	],
}
