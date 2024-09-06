import { DocumentIcon } from '@sanity/icons';

const page = {
	name: 'page',
	title: 'Pages',
	type: 'document',
	icon: DocumentIcon,
	fields: [
		{
			name: 'seo',
			title: 'SEO',
			type: 'seo',
			description: 'Leave blank to use Site SEO from Site Info for this',
			hidden: ({ document }: any) =>
				document.slug && document.slug.current == '/',
			options: {
				collapsible: true,
				collapsed: true,
				modal: { type: 'popover' },
			},
		},
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
		},
		{
			name: 'content',
			title: 'Blocks',
			type: 'array',
			of: [
				{
					type: 'PageIntro',
				},
				{
					type: 'TextStack',
				},
				{
					type: 'ImageBlock',
				},
				{
					type: 'ImageCarousel',
				},
				{
					type: 'ImageText',
				},
				{
					type: 'StandaloneText',
				},
				{
					type: 'ButtonBlock',
				},
				{
					type: 'VideoBlock',
				},
				{
					type: 'LogoGrid',
				},
				{
					type: 'FadeExplainer',
				},
				{
					type: 'Spacer',
				},
				{
					type: 'ThemeSwitch',
				},
			],
			options: {
				insertMenu: {
					filter: true,
					groups: [
						{
							name: 'intro',
							title: 'Intro',
							of: ['PageIntro'],
						},
						{
							name: 'text',
							title: 'Text',
							of: ['TextStack', 'StandaloneText', 'ImageText'],
						},
						{
							name: 'storytelling',
							title: 'Storytelling',
							of: ['ImageText', 'FadeExplainer', 'LogoGrid'],
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
};

export default page;
