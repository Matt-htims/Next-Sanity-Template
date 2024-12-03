import type { Config } from 'tailwindcss';
const { createThemes } = require('tw-colors');

// Colors
const black = '#000000';
const offBlack = '#121212';
const green = '#446959';
const orange = '#C76647';
const white = '#FFFFFF';
const offWhite = '#F5F5F5';

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
			offBlack,
			white,
			offWhite,
			primary: orange,
			secondary: green,
			text: black,
			'button-primary': {
				DEFAULT: green,
				text: white,
			},
			'button-secondary': {
				DEFAULT: orange,
				text: white,
			},
		},
		extend: {
			fontFamily: {
				body: ['var(--font-inter)'],
				heading: ['var(--font-inter)'],
			},
			fontSize: {
				h1: ['64px', '68px'],
				h2: ['48px', '54px'],
				h3: ['32px', '38px'],
				h4: ['28px', '34px'],
				h5: ['24px', '30px'],
				h6: ['16px', '22px'],
				body: ['24px', '34px'],
				'body-small': ['16px', '22px'],
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
				offColor: offWhite,
			},
			dark: {
				background: black,
				text: white,
				offColor: offBlack,
			},
		}),
	],
};
export default config;
