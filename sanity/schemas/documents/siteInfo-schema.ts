import { InfoOutlineIcon, LaunchIcon } from '@sanity/icons';

const siteInfo = {
	name: 'siteInfo',
	title: 'Site Info',
	type: 'document',
	icon: InfoOutlineIcon,
	groups: [
		{ name: 'general', title: 'General' },
		{ name: 'header', title: 'Header' },
		{ name: 'footer', title: 'Footer' },
	],
	fields: [
		{
			name: 'seo',
			title: 'Site SEO',
			type: 'siteSeo',
			group: 'general',
			options: {
				collapsible: true,
				collapsed: true,
				modal: { type: 'popover' },
			},
		},
		{
			name: 'siteName',
			title: 'Site Name',
			type: 'string',
			group: 'general',
		},
		{
			name: 'siteLogo',
			title: 'Site Logo',
			type: 'siteLogo',
			group: 'general',
		},
		{
			name: 'navMenu',
			title: 'Nav Menu',
			type: 'array',
			group: 'header',
			of: [{ type: 'navItem' }],
		},
		{
			name: 'addBanner',
			group: 'header',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'banner',
			title: 'Banner',
			group: 'header',
			type: 'array',
			hidden: ({ parent }: any) => parent?.addBanner == false,
			validation: (rule: any) => rule.max(3),
			of: [
				{
					name: 'bannerItem',
					type: 'object',
					icon: LaunchIcon,
					fields: [
						{
							name: 'bannerContent',
							type: 'string',
						},
						{
							name: 'bannerLink',
							title: 'Banner Link',
							type: 'string',
						},
						{
							name: 'bannerColour',
							type: 'string',
							initialValue: 'value',
							options: {
								list: [
									{ value: 'primary', title: 'Primary' },
									{ value: 'secondary', title: 'Secondary' },
								],
							},
						},
					],
				},
			],
		},
	],
};

export default siteInfo;
