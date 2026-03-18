import { textStyles } from './text';

/*
	New Brand Handoff Template
	Replace variant and size utility strings from your Figma button specs.
	Keep existing keys unless you are also updating Sanity schema options.
*/

// Button variant type
export type buttonVariantType =
	| 'default'
	| 'secondary'
	| 'outline'
	| 'link'
	| 'nav'
	| null
	| undefined;

// Button size type
export type buttonSizeType = 'default' | 'sm' | 'lg' | 'nav';

// Button variants for Button in /ui
export const buttonVariants = {
	variant: {
		// Example: default: 'bg-brand-500 text-white rounded-full',
		default: 'bg-button-primary text-button-primary-text',
		secondary: 'bg-button-secondary text-button-secondary-text',
		outline: 'border border-border-strong rounded-full',
		link: 'text-text-primary underline underline-offset-4',
		nav: 'text-text-primary font-bold text-underline-simple',
	},
	size: {
		// Example: default: 'text-base leading-none px-8 py-4',
		default: 'text-[26px] leading-none px-10 py-5',
		sm: 'text-[22px] leading-none px-6 py-3',
		lg: 'text-3xl leading-none px-12 py-6',
		nav: `${textStyles.nav} px-5 py-3`,
	},
};

// Sanity button variant options
export const sanityButtonVariants = ['default', 'secondary', 'outline', 'link'];

// Sanity button size options
export const sanityButtonSizes = ['default', 'sm', 'lg'];

// Sanity navItem variant options
export const sanityNavItemVariants = [
	'nav',
	'default',
	'secondary',
	'outline',
	'link',
];

// Sanity navItem size options
export const sanityNavItemSizes = ['nav', 'default', 'sm', 'lg'];
