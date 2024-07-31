import { InfoOutlineIcon } from '@sanity/icons';

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
	],
};

export default siteInfo;
