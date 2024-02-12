import { DocumentsIcon } from '@sanity/icons';

const page = {
	name: 'page',
	title: 'Pages',
	type: 'document',
	icon: DocumentsIcon,
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
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'PageIntro',
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
		},
	],
};

export default page;
