import { EllipsisVerticalIcon } from '@sanity/icons';

const textStack = {
	name: 'TextStack',
	title: 'Text Stack',
	type: 'object',
	icon: EllipsisVerticalIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Text Stack',
			hidden: true,
		},
		{
			name: 'centered',
			title: 'Centered',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'maxWidth',
			title: 'Max Width (Desktop)',
			type: 'string',
			initialValue: 'six',
			options: {
				list: [
					{ value: 'six', title: 'Half of Container' },
					{ value: 'seven', title: '7/12 of Container' },
					{ value: 'eight', title: 'Two-thirds of Container' },
					{ value: 'boxed', title: 'Boxed' },
					{ value: 'sideBySide', title: 'Side By Side' },
				],
			},
		},
		{
			name: 'pretitle',
			title: 'Pretitle',
			type: 'richText',
			description: 'Leave blank if not needed',
		},
		// {
		// 	name: 'heading',
		// 	title: 'Heading',
		// 	type: 'textWithOptions',
		// },
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
		// {
		// 	name: 'body',
		// 	title: 'Body',
		// 	type: 'textWithOptions',
		// },
		{
			name: 'buttons',
			title: 'Buttons',
			type: 'array',
			of: [{ type: 'button' }],
		},
	],
};

export default textStack;
