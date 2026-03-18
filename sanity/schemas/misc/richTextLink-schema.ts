import { LinkIcon } from '@sanity/icons';

const richTextLink = {
	name: 'richTextLink',
	title: 'Rich Text Link',
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
					{ value: 'default', title: 'Internal page link' },
					{ value: 'customLink', title: 'External/custom link' },
					{
						value: 'anchorLinkCurrentPage',
						title: 'Anchor on current page',
					},
					{
						value: 'anchorLinkDifferentPage',
						title: 'Anchor on different page',
					},
				],
			},
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
			name: 'anchorLink',
			title: 'Anchor Link',
			description: 'Element id to scroll to, without # prefix.',
			type: 'string',
			hidden: ({ parent }: any) =>
				parent?.linkType !== 'anchorLinkCurrentPage' &&
				parent?.linkType !== 'anchorLinkDifferentPage',
		},
	],
};

export default richTextLink;
