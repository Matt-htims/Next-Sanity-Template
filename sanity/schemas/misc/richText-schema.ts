import { sanityTextOptions } from '@/app/MasterText';
import { TextIcon, HomeIcon } from '@sanity/icons';

const richText = {
	name: 'richText',
	title: 'Rich Text',
	description:
		'Able to customise text color and display style. Change Text Style if the Type and Style differ, e.g. a H2 that should look like a H1.',
	type: 'array',
	hidden: ({ parent }: any) => parent?.useSimpleText == true,
	of: [
		{
			type: 'block',
			marks: {
				annotations: [
					{ type: 'textColor' },
					{
						name: 'textStyle',
						title: 'Text Style',
						type: 'object',
						icon: TextIcon,
						fields: [
							{
								name: 'textStyle',
								title: 'Text Style',
								type: 'string',
								initialValue: 'body',
								options: {
									list: sanityTextOptions,
								},
							},
						],
					},
					{
						name: 'link',
						type: 'object',
						title: 'link',
						fields: [
							{
								name: 'href',
								type: 'url',
								title: 'URL',
								validation: (Rule: any) =>
									Rule.uri({
										scheme: [
											'http',
											'https',
											'mailto',
											'tel',
										],
									}),
							},
						],
					},
					{
						name: 'internalLink',
						type: 'object',
						title: 'Internal Link',
						Icon: HomeIcon,
						fields: [
							{
								name: 'reference',
								type: 'reference',
								title: 'Reference',
								to: [{ type: 'page' }],
							},
						],
					},
				],
			},
		},
	],
};

export default richText;
