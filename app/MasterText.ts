// Text type for TextWithOptions
export type textStyleType =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body'
	| 'body-small';

// Text Styles for Text & Motion Text Atom
export const textStyles = {
	h1: 'text-[49px] leading-[54px] md:text-[64px] md:leading-[68px]',
	h2: 'text-[32px] leading-[38px] md:text-[48px] md:leading-[54px]',
	h3: 'text-[28px] leading-[34px] md:text-[32px] md:leading-[38px]',
	h4: 'text-[24px] leading-[30px] md:text-[28px] md:leading-[34px]',
	h5: 'text-[24px] leading-[30px]',
	h6: 'text-[18px] leading-[22px]',
	body: 'text-[16px] leading-[22px] sm:text-[24px] sm:leading-[34px] font-normal',
	'body-small': 'text-[16px] leading-[22px] font-normal',
};

// Text options for RichText and TextWithOptions styles
export const sanityTextOptions = [
	{ value: 'h1', title: 'H1' },
	{ value: 'h2', title: 'H2' },
	{ value: 'h3', title: 'H3' },
	{ value: 'h4', title: 'H4' },
	{ value: 'h5', title: 'H5' },
	{ value: 'h6', title: 'H6' },
	{
		value: 'body',
		title: 'Body',
	},
	{
		value: 'body-small',
		title: 'Body Small',
	},
];
