import { LinkIcon } from '@sanity/icons';

const link = {
	name: 'link',
	title: 'Link',
	type: 'object',
	icon: LinkIcon,
	fields: [
		{
			name: 'linkType',
			title: 'Link Type',
			type: 'string',
			initialValue: 'default',
			options: {
				list: [
					{
						value: 'default',
						title: 'Default (Internal page link)',
					},
					{
						value: 'customLink',
						title: 'Custom Link (External link)',
					},
					{
						value: 'anchorLinkCurrentPage',
						title: 'Anchor Link on current page',
					},
					{
						value: 'anchorLinkDifferentPage',
						title: 'Anchor Link on different page',
					},
				],
			},
		},
		{
			name: 'displayName',
			title: 'Display Name',
			type: 'string',
			hidden: ({ parent }: any) =>
				parent?.linkType !== 'customLink' &&
				parent?.linkType !== 'anchorLinkCurrentPage',
		},
		{
			name: 'externalLink',
			title: 'External Link',
			type: 'string',
			hidden: ({ parent }: any) => parent?.linkType !== 'customLink',
		},
		{
			name: 'page',
			title: 'Page',
			type: 'reference',
			to: [{ type: 'page' }],
			hidden: ({ parent }: any) =>
				parent?.linkType !== 'default' &&
				parent?.linkType !== 'anchorLinkDifferentPage',
		},
		{
			name: 'pageTitle',
			title: 'Page Title',
			description:
				'Overwrite page title - If left blank will use default page name',
			type: 'string',
			hidden: ({ parent }: any) =>
				parent?.linkType !== 'default' &&
				parent?.linkType !== 'anchorLinkDifferentPage',
		},
		{
			name: 'anchorLink',
			title: 'Anchor Link',
			description:
				'Add anchor link to link to a section on the page using an element id.',
			type: 'string',
			hidden: ({ parent }: any) =>
				parent?.linkType !== 'anchorLinkCurrentPage' &&
				parent?.linkType !== 'anchorLinkDifferentPage',
		},
	],
	preview: {
		select: {
			linkType: 'linkType',
			title: 'page.name',
			pageTitle: 'pageTitle',
			displayName: 'displayName',
		},
		prepare(selection: any) {
			const { linkType, title, pageTitle, displayName } = selection;

			let previewTitle = 'Link';

			if (
				linkType == 'default' ||
				linkType == 'anchorLinkDifferentPage'
			) {
				previewTitle = pageTitle ?? title ?? 'Link';
			} else if (
				linkType == 'customLink' ||
				linkType == 'anchorLinkCurrentPage'
			) {
				previewTitle = displayName ?? 'Link';
			}
			return {
				title: previewTitle,
			};
		},
	},
};

export default link;
