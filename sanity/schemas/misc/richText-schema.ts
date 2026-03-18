import { TextIcon } from '@sanity/icons';
import { sanityTextOptions } from '@/app/theme/text';
import { richTextColorOptions } from '@/app/theme/richTextColor';
import RichTextColorInput from '@/sanity/components/RichTextColorInput';
import RichTextAppearanceAnnotation from '@/sanity/components/RichTextAppearanceAnnotation';

const richText = {
	name: 'richText',
	title: 'Rich Text',
	description:
		'Flexible rich text for design-led sections. For semantic editorial content, use blogRichText.',
	type: 'array',
	hidden: ({ parent }: any) => parent?.useSimpleText == true,
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
				{ title: 'H6', value: 'h6' },
			],
			marks: {
				annotations: [
					{
						name: 'textAppearance',
						title: 'Text Appearance',
						type: 'object',
						icon: TextIcon,
						description:
							'Optional visual override for selected text: style and/or color.',
						components: {
							annotation: RichTextAppearanceAnnotation,
						},
						fields: [
							{
								name: 'textStyle',
								title: 'Text Style',
								type: 'string',
								options: {
									list: sanityTextOptions,
								},
							},
							{
								name: 'colorToken',
								title: 'Text Color',
								type: 'string',
								components: {
									input: RichTextColorInput,
								},
								options: {
									list: richTextColorOptions,
								},
							},
							{
								name: 'color',
								title: 'Legacy Text Color (Deprecated)',
								type: 'textColor',
								hidden: true,
							},
						],
					},
					{
						type: 'richTextLink',
					},
				],
			},
		},
	],
};

export default richText;
