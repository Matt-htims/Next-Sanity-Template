import type { Config } from 'tailwindcss';

// Colours
const black = '#000000';
const offBlack = '#121212';
const green = '#446959';
const orange = '#C76647';
const white = '#FFFFFF';
const offWhite = '#F5F5F5';

const wireframeBlack = '#000000';
const wireframeDarkGrey = '#121212';
const wireframeGrey = '#7C7C7C';
const wireframeLightGrey = '#F5F5F5';
const wireframeWhite = '#FFFFFF';

// Colour redeclaration

const dark = black;
const offDark = offBlack;
const light = white;
const offLight = offWhite;
const primary = green;
const secondary = orange;

// Colour redaclaration for wireframe mode

// const dark = wireframeBlack;
// const offDark = wireframeDarkGrey;
// const light = wireframeWhite;
// const offLight = wireframeLightGrey;
// const primary = wireframeGrey;
// const secondary = wireframeGrey;

// Container
const site = '1420px';

// Border Radius
const brSite = '10px';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: dark,
			offBlack: offDark,
			white: light,
			offWhite: offLight,
			primary,
			secondary,
			text: dark,
			'button-primary': {
				DEFAULT: primary,
				text: light,
			},
			'button-secondary': {
				DEFAULT: secondary,
				text: light,
			},
		},
		extend: {
			fontFamily: {
				body: ['var(--font-inter)'],
				heading: ['var(--font-inter)'],
			},
			maxWidth: {
				site,
			},
			borderRadius: {
				site: brSite,
			},
			screens: {
				xs: '440px',
			},
		},
	},
	plugins: [],
};
export default config;
