import { sanityButtonSizes, sanityButtonVariants } from '@/app/MasterButton';
import { LaunchIcon } from '@sanity/icons';

const button = {
	name: 'button',
	title: 'Button',
	type: 'object',
	icon: LaunchIcon,
	fields: [
		{
			name: 'link',
			type: 'link',
		},
		{
			name: 'buttonVariant',
			title: 'Button Variant',
			type: 'string',
			initialValue: 'default',
			options: {
				list: sanityButtonVariants,
			},
		},
		{
			name: 'buttonSize',
			title: 'Button Size',
			type: 'string',
			initialValue: 'default',
			options: {
				list: sanityButtonSizes,
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

export default button;
