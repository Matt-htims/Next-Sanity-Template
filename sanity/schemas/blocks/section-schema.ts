import { StackCompactIcon } from '@sanity/icons';
import { sectionBgOptions } from '@/app/theme/sectionBg';

const section = {
	name: 'Section',
	title: 'Section',
	type: 'object',
	icon: StackCompactIcon,
	fields: [
		{
			name: 'backgroundColor',
			title: 'Background Colour',
			type: 'string',
			options: {
				list: sectionBgOptions.map((o) => ({
					title: o.title,
					value: o.value,
				})),
				layout: 'radio',
			},
		},
		{
			name: 'content',
			title: 'Blocks',
			type: 'array',
			of: [
				{ type: 'WireframeBlock' },
				{ type: 'PageIntro' },
				{ type: 'TextStack' },
				{ type: 'ImageBlock' },
				{ type: 'ImageCarousel' },
				{ type: 'ImageText' },
				{ type: 'StandaloneText' },
				{ type: 'TestimonialSlider' },
				{ type: 'ButtonBlock' },
				{ type: 'VideoBlock' },
				{ type: 'LogoGrid' },
				{ type: 'Spacer' },
				{ type: 'ThemeSwitch' },
			],
			options: {
				insertMenu: {
					filter: true,
					groups: [
						{ name: 'intro', title: 'Intro', of: ['PageIntro'] },
						{
							name: 'text',
							title: 'Text',
							of: ['TextStack', 'StandaloneText', 'ImageText'],
						},
						{
							name: 'storytelling',
							title: 'Storytelling',
							of: ['ImageText', 'LogoGrid', 'TestimonialSlider'],
						},
						{
							name: 'media',
							title: 'Media',
							of: [
								'ImageBlock',
								'ImageCarousel',
								'ImageText',
								'VideoBlock',
							],
						},
						{
							name: 'cta',
							title: 'Call To Action',
							of: ['ButtonBlock'],
						},
						{
							name: 'misc',
							title: 'Miscellaneous',
							of: ['Spacer', 'ThemeSwitch'],
						},
					],
				},
			},
		},
	],
	preview: {
		select: {
			backgroundColor: 'backgroundColor',
			content: 'content',
		},
		prepare({ backgroundColor, content }: any) {
			const label = sectionBgOptions.find(
				(o) => o.value === backgroundColor,
			)?.title;
			return {
				title: `Section${label ? ` — ${label}` : ''}`,
				subtitle: content?.length
					? `${content.length} block${content.length === 1 ? '' : 's'}`
					: 'No blocks',
			};
		},
	},
};

export default section;
