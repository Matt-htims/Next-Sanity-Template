import { sanityNavItemSizes, sanityNavItemVariants } from '@/app/theme/button';
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
			name: 'dropdownItems',
			title: 'Dropdown Items',
			description: 'Optional child links — adds a hover dropdown on desktop',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'dropdownItem',
					title: 'Dropdown Item',
					fields: [
						{
							name: 'link',
							type: 'link',
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
							const { linkType, title, pageTitle, displayName } =
								selection;
							let previewTitle = 'Link';
							if (
								linkType === 'default' ||
								linkType === 'anchorLinkDifferentPage'
							) {
								previewTitle = pageTitle ?? title ?? 'Link';
							} else if (
								linkType === 'customLink' ||
								linkType === 'anchorLinkCurrentPage'
							) {
								previewTitle = displayName ?? 'Link';
							}
							return { title: previewTitle };
						},
					},
				},
			],
		},
		{
			name: 'buttonVariant',
			title: 'Button Variant',
			type: 'string',
			initialValue: 'nav',
			options: {
				list: sanityNavItemVariants,
			},
		},
		{
			name: 'buttonSize',
			title: 'Button Size',
			type: 'string',
			initialValue: 'nav',
			options: {
				list: sanityNavItemSizes,
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
