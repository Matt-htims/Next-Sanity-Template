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
		spacing: {
			'0': '0px',
			px: '1px',
			'0.5': '5px',
			'1': '10px',
			'1.5': '15px',
			'2': '20px',
			'3': '30px',
			'4': '40px',
			'5': '50px',
			'6': '60px',
			'7': '70px',
			'8': '80px',
			'9': '90px',
			'10': '100px',
			'11': '110px',
			'12': '120px',
			'13': '130px',
			'14': '140px',
			'15': '150px',
			'16': '160px',
			'18': '180px',
			'20': '200px',
			'25': '250px',
		},
		extend: {
			fontFamily: {
				body: ['var(--font-inter)'],
				heading: ['var(--font-inter)'],
				eventide: ['var(--font-inter)'],
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
