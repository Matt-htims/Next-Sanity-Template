/*
	New Brand Handoff Template
	Replace textStyles with your Figma type scale.
	Keep the same keys so existing components and Sanity options continue to work.
*/

// Text type for TextWithOptions
export type textStyleType =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body'
	| 'body-small'
	| 'nav';

// Text Styles for Text & Motion Text Atom
export const textStyles = {
	// Example target shape:
	// h1: 'text-[56px] leading-[60px] md:text-[72px] md:leading-[76px]',
	// body: 'text-[18px] leading-[28px] md:text-[20px] md:leading-[30px]',
	h1: 'text-[49px] leading-[54px] md:text-[64px]  md:leading-[68px]',

	h2: 'text-[32px] leading-[38px] md:text-[48px] md:leading-[54px]',

	h3: 'text-[28px] leading-[34px] md:text-[32px] md:leading-[38px]',

	h4: 'text-[24px] leading-[30px] md:text-[28px] md:leading-[34px]',

	h5: 'text-[24px] leading-[30px]',

	h6: 'text-[18px] leading-[22px]',

	body: 'font-normal text-[16px] leading-[22px] sm:text-[24px] sm:leading-[34px]',

	'body-small': 'font-normal text-[16px] leading-[22px] ',

	nav: 'font-bold text-[30px] leading-[34px] lg:text-[18px] lg:leading-[22px]',
};

// Sanity options for rich text and textWithOptions styles
export const sanityTextOptions = [
	{ value: 'h1', title: 'H1' },
	{ value: 'h2', title: 'H2' },
	{ value: 'h3', title: 'H3' },
	{ value: 'h4', title: 'H4' },
	{ value: 'h5', title: 'H5' },
	{ value: 'h6', title: 'H6' },
	{ value: 'body', title: 'Body' },
	{ value: 'body-small', title: 'Body Small' },
];
