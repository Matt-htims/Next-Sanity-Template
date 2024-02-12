import { PanelRightIcon } from '@sanity/icons';

const imageText = {
	name: 'ImageText',
	title: 'Image & Text',
	type: 'object',
	icon: PanelRightIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Image & Text',
			hidden: true,
		},
		{
			name: 'imageSide',
			title: 'Image Side',
			type: 'string',
			initialValue: 'left',
			options: {
				list: [
					{ value: 'left', title: 'Left' },
					{ value: 'right', title: 'Right' },
				],
			},
		},
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
		{
			name: 'richText',
			title: 'Text',
			type: 'array',
			of: [
				{
					type: 'block',
				},
			],
		},
	],
};

export default imageText;
