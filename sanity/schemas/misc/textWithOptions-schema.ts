const textWithOptions = {
	name: 'textWithOptions',
	title: 'Text With Options',
	type: 'object',

	fields: [
		{ name: 'text', title: 'Text', type: 'text', rows: 2 },
		{
			name: 'textOptions',
			title: 'Text Options',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
				columns: 2,
				modal: { type: 'popover' },
			},
			fields: [
				{
					name: 'textType',
					title: 'Text Type',
					type: 'string',
					initialValue: 'h3',
					options: {
						list: [
							{ value: 'h1', title: 'H1' },
							{ value: 'h2', title: 'H2' },
							{ value: 'h3', title: 'H3' },
							{ value: 'h4', title: 'H4' },
							{ value: 'p', title: 'Paragraph' },
						],
					},
				},
				{
					name: 'textStyle',
					title: 'Text Style',
					type: 'string',
					initialValue: 'h3',
					options: {
						list: [
							{ value: 'h1', title: 'H1' },
							{ value: 'h2', title: 'H2' },
							{ value: 'h3', title: 'H3' },
							{ value: 'h4', title: 'H4' },
							{ value: 'h5', title: 'H5' },
							{ value: 'h6', title: 'H6' },
							{ value: 'body', title: 'Body' },
							{ value: 'body-small', title: 'Body Small' },
						],
					},
				},
				{
					name: 'textCentered',
					title: 'Text Centered',
					type: 'boolean',
					initialValue: false,
					hidden: true,
				},
			],
		},
	],
};

export default textWithOptions;
