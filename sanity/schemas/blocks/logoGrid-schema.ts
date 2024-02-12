import { LemonIcon } from '@sanity/icons';

const logoGrid = {
	name: 'LogoGrid',
	title: 'Logo Grid',
	type: 'object',
	icon: LemonIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Logo Grid',
			hidden: true,
		},
		{
			name: 'logos',
			title: 'Logos',
			type: 'array',
			of: [
				{
					name: 'image',
					title: 'Image',
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'Alt',
							type: 'string',
						},
					],
				},
			],
		},
	],
};

export default logoGrid;
