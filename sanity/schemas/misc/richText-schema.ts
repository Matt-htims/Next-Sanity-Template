import { TextIcon } from '@sanity/icons';

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
								initialValue: 'h3',
								options: {
									list: [
										{ value: 'h1', title: 'H1' },
										{ value: 'h2', title: 'H2' },
										{ value: 'h3', title: 'H3' },
										{ value: 'h4', title: 'H4' },
										{
											value: 'body',
											title: 'Body',
										},
										{
											value: 'body-small',
											title: 'Body Small',
										},
									],
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
				],
			},
		},
	],
};

export default richText;
