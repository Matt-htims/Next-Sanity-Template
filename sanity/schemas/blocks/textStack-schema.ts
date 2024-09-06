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
			initialValue: true,
		},
		{
			name: 'pretitle',
			title: 'Pretitle',
			type: 'textWithOptions',
			description: 'Leave blank if not needed',
		},
		{
			name: 'heading',
			title: 'Heading',
			type: 'textWithOptions',
		},
		{
			name: 'body',
			title: 'Body',
			type: 'textWithOptions',
		},
		{
			name: 'buttons',
			title: 'Buttons',
			type: 'array',
			of: [{ type: 'button' }],
		},
	],
};

export default textStack;
