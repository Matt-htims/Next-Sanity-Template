import { HomeIcon } from '@sanity/icons';

const blogRichText = {
	name: 'blogRichText',
	title: 'Blog Rich Text',
	description:
		'Semantic-first rich text for editorial content. Headings always render with matching heading styles.',
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{ title: 'Paragraph', value: 'normal' },
				{ title: 'H1', value: 'h1' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'H5', value: 'h5' },
				{ title: 'Blockquote', value: 'blockquote' },
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
			],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'Link',
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

export default blogRichText;
