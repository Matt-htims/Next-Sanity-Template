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
		default: 'bg-button-primary text-button-primary-text',
		secondary: 'bg-button-secondary text-button-secondary-text',
		outline: 'border border-black rounded-full',
		link: 'text-black underline underline-offset-4',
		nav: 'text-black font-medium text-underline-simple',
	},
	size: {
		default: 'text-[26px] leading-none px-10 py-5',
		sm: 'text-[22px] leading-none px-6 py-3',
		lg: 'text-3xl leading-none px-12 py-6',
		nav: 'text-2xl lg:text-lg leading-none px-5 py-3',
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
