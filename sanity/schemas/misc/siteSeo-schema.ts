const siteSeo = {
	name: 'siteSeo',
	title: 'Site SEO',
	type: 'object',
	fields: [
		{
			name: 'seoTitle',
			title: 'SEO title',
			type: 'string',
		},
		{
			name: 'seoDescription',
			title: 'SEO Description',
			type: 'text',
			rows: 5,
		},
		{
			name: 'favicon',
			title: 'Favicon',
			description: 'Add as a .ico file',
			type: 'file',
		},
		{
			name: 'opengraphImage',
			title: 'Opengraph Image',
			description: 'For both opengraph and twitter',
			type: 'image',
		},
	],
};

export default siteSeo;
