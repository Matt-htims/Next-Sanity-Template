const button = {
	name: 'button',
	title: 'Button',
	type: 'object',
	fields: [
		{
			name: 'url',
			title: 'URL',
			type: 'string',
		},
		{
			name: 'newTab',
			title: 'Open in a new tab',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'buttonText',
			title: 'Button Text',
			type: 'string',
		},
		{
			name: 'buttonType',
			title: 'Button Type',
			type: 'string',
			initialValue: 'primary',
			options: {
				list: ['primary', 'outline'],
			},
		},
		{
			name: 'buttonAnimation',
			title: 'Animation',
			type: 'string',
			initialValue: 'none',
			options: {
				list: [
					{ value: 'none', title: 'None' },
					{
						value: 'button-text-reveal',
						title: 'Button Text Reveal',
					},
				],
			},
		},
	],
};

export default button;
