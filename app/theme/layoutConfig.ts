export type textStackWidthOption = 'default' | 'wide' | 'narrow';

export const sanityTextStackWidthOptions = [
	{ value: 'default', title: 'Default' },
	{ value: 'wide', title: 'Wide' },
	{ value: 'narrow', title: 'Narrow' },
];

export const layoutWidthClassMap: Record<textStackWidthOption, string> = {
	default: 'max-w-228 md:w-10/12',
	wide: 'max-w-259 md:w-10/12',
	narrow: 'max-w-169 md:w-9/12 lg:w-10/12',
};

export const layoutWidthBaseClassName = 'mx-auto max-w-235';
