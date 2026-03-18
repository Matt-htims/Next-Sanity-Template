import { EllipsisVerticalIcon } from '@sanity/icons';
import { sanityTextStackWidthOptions } from '@/app/theme/layoutConfig';

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
			name: 'id',
			title: 'HTML ID',
			type: 'string',
			description:
				'Optional anchor id for linking to this section, for example: contact or about-us.',
		},
		{
			name: 'maxWidth',
			title: 'Width',
			type: 'string',
			initialValue: 'default',
			options: {
				list: sanityTextStackWidthOptions,
			},
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
		{
			name: 'form',
			title: 'Form',
			type: 'reference',
			to: [{ type: 'form' }],
			description:
				'Optionally attach a reusable Form document to render a Formspree form in this block.',
		},
	],
};

export default textStack;
