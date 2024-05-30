import type { Config } from 'tailwindcss';
const { createThemes } = require('tw-colors');

// Colors
const black = '#000000';
const offblack = '#121212';
const lush = '#446959';
const clay = '#C76647';
const white = '#FFFFFF';
const offwhite = '#F5F5F5';
const balls = '#DCED5A';

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
			black,
			offblack,
			white,
			offwhite,
			background: white,
			primary: clay,
			secondary: lush,
			accent: balls,
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
	plugins: [
		createThemes({
			light: {
				background: white,
				text: black,
				offColor: offwhite,
			},
			dark: {
				background: black,
				text: white,
				offColor: offblack,
			},
		}),
	],
};
export default config;
