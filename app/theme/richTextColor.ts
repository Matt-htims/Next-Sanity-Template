/*
  New Brand Handoff Template
  Update these options when your rich text/editor color token set changes.
  Actual color values are defined in theme.css custom properties.
*/
export const richTextColorDefinitions = [
	{
		title: 'Text Primary',
		value: 'textPrimary',
		cssVar: '--semantic-text-primary',
	},
	{
		title: 'Text Secondary',
		value: 'textSecondary',
		cssVar: '--semantic-text-secondary',
	},
	{
		title: 'Accent',
		value: 'accent',
		cssVar: '--accent',
	},
	{
		title: 'Accent Alt',
		value: 'accentAlt',
		cssVar: '--accent-alt',
	},
] as const;

export type RichTextColorToken =
	(typeof richTextColorDefinitions)[number]['value'];

export const richTextColorOptions = richTextColorDefinitions.map(
	({ title, value }) => ({ title, value }),
);

export const richTextColorVarMap = richTextColorDefinitions.reduce(
	(map, { value, cssVar }) => {
		map[value] = cssVar;
		return map;
	},
	{} as Record<RichTextColorToken, string>,
);

export const richTextColorStudioColorMap = richTextColorDefinitions.reduce(
	(map, { value, cssVar }) => {
		map[value] = `var(${cssVar})`;
		return map;
	},
	{} as Record<RichTextColorToken, string>,
);

export const richTextColorTitleMap = richTextColorDefinitions.reduce(
	(map, { value, title }) => {
		map[value] = title;
		return map;
	},
	{} as Record<RichTextColorToken, string>,
);
