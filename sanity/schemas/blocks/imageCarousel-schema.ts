import { ImagesIcon } from '@sanity/icons';

const imageCarousel = {
	name: 'ImageCarousel',
	title: 'Image Carousel',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Image Carousel',
			hidden: true,
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
						{
							name: 'carouselSize',
							title: 'Carousel Size',
							type: 'string',
							initialValue: 'medium',
							options: {
								list: [
									{ value: 'landscape', title: 'Landscape' },
									{ value: 'square', title: 'Square' },
									{ value: 'portrait', title: 'Portrait' },
									{
										value: 'portraitNarrow',
										title: 'Portrait narrow',
									},
								],
							},
						},
					],
				},
			],
		},
	],
};

export default imageCarousel;
