import { LinkIcon } from '@sanity/icons';

const navItem = {
	name: 'navItem',
	title: 'Nav Item',
	type: 'object',
	icon: LinkIcon,
	fields: [
		{
			name: 'customLink',
			title: 'Custom Link',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'displayName',
			title: 'Display Name',
			type: 'string',
			hidden: ({ parent }: any) => parent.customLink == false,
		},
		{
			name: 'link',
			title: 'Link',
			type: 'string',
			hidden: ({ parent }: any) => parent.customLink == false,
		},
		{
			name: 'page',
			title: 'Page',
			type: 'reference',
			to: [{ type: 'page' }],
			hidden: ({ parent }: any) => parent.customLink == true,
		},
		{
			name: 'addSubpages',
			title: 'Add Subpages',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }: any) => parent.customLink == true,
		},
		{
			name: 'subPages',
			title: 'Sub Pages',
			type: 'array',
			hidden: ({ parent }: any) =>
				!parent.addSubpages || parent.customLink == true,
			of: [{ type: 'reference', to: [{ type: 'page' }] }],
		},
	],
	preview: {
		select: {
			title: 'page.name',
			displayName: 'displayName',
			addSubpages: 'addSubpages',
			subPage1: 'subPages.0.name',
			subPage2: 'subPages.1.name',
			subPage3: 'subPages.2.name',
			subPage4: 'subPages.3.name',
			subPage5: 'subPages.4.name',
			subPage6: 'subPages.5.name',
			subPage7: 'subPages.6.name',
			subPage8: 'subPages.7.name',
			subPage9: 'subPages.8.name',
			subPage10: 'subPages.9.name',
		},
		prepare(selection: any) {
			const {
				title,
				displayName,
				addSubpages,
				subPage1,
				subPage2,
				subPage3,
				subPage4,
				subPage5,
				subPage6,
				subPage7,
				subPage8,
				subPage9,
				subPage10,
			} = selection;
			const subPages = [
				subPage1,
				subPage2,
				subPage3,
				subPage4,
				subPage5,
				subPage6,
				subPage7,
				subPage8,
				subPage9,
				subPage10,
			];
			const subPages2 = subPages.filter(
				(subPage) => subPage !== undefined,
			);

			return {
				title: title ? title : displayName,
				subtitle: `${addSubpages ? 'Sub Pages: ' : ''}${subPages2
					.toString()
					.replace(/,/g, ', ')}`,
			};
		},
	},
};

export default navItem;
