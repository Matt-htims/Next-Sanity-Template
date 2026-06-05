import { ImageIcon } from '@sanity/icons';
import { sanityTextStackWidthOptions } from '@/app/theme/layoutConfig';

const imageBlock = {
	name: 'ImageBlock',
	title: 'Image Block',
	type: 'object',
	icon: ImageIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Image Block',
			hidden: true,
		},
		{
			name: 'layoutWidth',
			title: 'Width',
			type: 'string',
			initialValue: 'default',
			options: { list: sanityTextStackWidthOptions },
		},
		{
			name: 'images',
			title: 'Images',
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

export default imageBlock;
