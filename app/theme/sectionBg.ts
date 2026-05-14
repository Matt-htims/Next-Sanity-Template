export const sectionBgOptions = [
	{ title: 'Surface', value: 'surface' },
	{ title: 'Dark', value: 'dark' },
	{ title: 'Accent', value: 'accent' },
	{ title: 'Gradient – Light', value: 'gradient-light' },
	{ title: 'Gradient – Dark', value: 'gradient-dark' },
] as const;

export type SectionBgValue = (typeof sectionBgOptions)[number]['value'];

export const sectionBgConfig: Record<
	SectionBgValue,
	{ className: string; dark: boolean }
> = {
	surface: { className: 'section-bg-surface', dark: false },
	dark: { className: 'section-bg-dark', dark: true },
	accent: { className: 'section-bg-accent', dark: false },
	'gradient-light': { className: 'section-bg-gradient-light', dark: false },
	'gradient-dark': { className: 'section-bg-gradient-dark', dark: true },
};
