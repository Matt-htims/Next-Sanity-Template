import { PanelRightIcon } from '@sanity/icons/PanelRight';

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
			name: 'pretitle',
			title: 'Pretitle',
			type: 'richText',
			description: 'Leave blank if not needed',
		},
		{
			name: 'headingRich',
			title: 'Heading',
			type: 'richText',
		},
		{
			name: 'bodyRich',
			title: 'Body',
			type: 'richText',
		},
		{
			name: 'buttons',
			title: 'Buttons',
			type: 'array',
			of: [{ type: 'button' }],
		},
	],
};

export default imageText;
