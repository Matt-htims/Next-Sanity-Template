import { BlockquoteIcon } from '@sanity/icons';

const pageIntro = {
	name: 'PageIntro',
	title: 'Page Intro',
	type: 'object',
	icon: BlockquoteIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Page Intro',
			hidden: true,
		},
		{
			name: 'style',
			title: 'Style',
			type: 'string',
			initialValue: 'standard',
			options: {
				list: [
					{ title: 'Standard', value: 'standard' },
					{ title: 'Simple', value: 'simple' },
				],
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			hidden: ({ parent }: any) => parent?.style !== 'standard',
			fields: [
				{
					name: 'alt',
					title: 'Alt',
					type: 'string',
				},
			],
		},
		{
			name: 'preheading',
			title: 'Pre-Heading',
			type: 'string',
		},
		{
			name: 'heading',
			title: 'Heading',
			type: 'string',
		},
		{
			name: 'subheading',
			title: 'Sub-Heading',
			type: 'string',
		},
	],
};

export default pageIntro;
