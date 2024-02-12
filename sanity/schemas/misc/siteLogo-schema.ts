const siteLogo = {
	name: 'siteLogo',
	title: 'Site Logo',
	type: 'object',
	fields: [
		{
			name: 'textAsLogo',
			title: 'Use Text as Logo',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'textLogo',
			title: 'Text Logo',
			type: 'string',
			hidden: ({ parent }: any) => parent?.textAsLogo == false,
		},
		{
			name: 'imageLogo',
			title: 'Image Logo',
			type: 'image',
			hidden: ({ parent }: any) => parent?.textAsLogo == true,
			fields: [
				{
					name: 'alt',
					title: 'Alt',
					type: 'string',
				},
			],
		},
	],
};

export default siteLogo;
