import { SunIcon } from '@sanity/icons';

const fadeExplainer = {
	name: 'FadeExplainer',
	title: 'Fade Explainer',
	type: 'object',
	icon: SunIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Fade Explainer',
			hidden: true,
		},
		{
			name: 'imageTextPairs',
			title: 'Image & Text Pairs',
			type: 'array',
			validation: (Rule: any) => Rule.max(5),
			of: [
				{
					name: 'imageText',
					title: 'Image & Text Pair',
					type: 'object',
					fields: [
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
							name: 'heading',
							title: 'Heading',
							type: 'string',
						},
						{
							name: 'body',
							title: 'Body',
							type: 'text',
							rows: 3,
						},
					],
				},
			],
		},
	],
};

export default fadeExplainer;
