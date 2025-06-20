import { LinkIcon } from '@sanity/icons';

const navItem = {
	name: 'navItem',
	title: 'Nav Item',
	type: 'object',
	icon: LinkIcon,
	fields: [
		{
			name: 'link',
			type: 'link',
		},
		{
			name: 'buttonType',
			title: 'Button Type',
			type: 'string',
			initialValue: 'nav',
			options: {
				list: ['nav', 'default', 'secondary', 'outline', 'link'],
			},
		},
		{
			name: 'buttonSize',
			title: 'Button Size',
			type: 'string',
			initialValue: 'nav',
			options: {
				list: ['nav', 'default', 'sm', 'lg'],
			},
		},
	],
	preview: {
		select: {
			linkType: 'link.linkType',
			title: 'link.page.name',
			pageTitle: 'link.pageTitle',
			displayName: 'link.displayName',
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

export default navItem;
