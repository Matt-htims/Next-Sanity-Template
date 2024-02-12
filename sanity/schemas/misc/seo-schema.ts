const seo = {
	name: 'seo',
	title: 'SEO',
	type: 'object',
	fields: [
		{
			name: 'seoTitle',
			title: 'SEO title',
			type: 'string',
			validation: (Rule: any) => Rule.max(65),
		},
		{
			name: 'seoDescription',
			title: 'SEO Description',
			type: 'text',
			rows: 5,
			validation: (Rule: any) => Rule.max(155),
		},
	],
};

export default seo;
