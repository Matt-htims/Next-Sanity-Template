import { ImagesIcon } from '@sanity/icons';

const imageCarouselLightbox = {
	name: 'ImageCarouselLightbox',
	title: 'Image Carousel Lightbox',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Image Carousel Lightbox',
			hidden: true,
		},
		{
			name: 'images',
			title: 'Images Row 1',
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
		{
			name: 'images2',
			title: 'Images Row 2',
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

export default imageCarouselLightbox;
