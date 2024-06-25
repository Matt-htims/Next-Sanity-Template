import { LaunchIcon } from '@sanity/icons';

const buttonBlock = {
	name: 'ButtonBlock',
	title: 'Button Block',
	type: 'object',
	icon: LaunchIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Button Block',
			hidden: true,
		},
		{
			name: 'buttons',
			title: 'Buttons',
			type: 'array',
			of: [{ type: 'button' }],
		},
	],
};

export default buttonBlock;
