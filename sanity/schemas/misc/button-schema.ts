import { LinkIcon } from '@sanity/icons';

const button = {
	name: 'button',
	title: 'Button',
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
			hidden: ({ parent }: any) => parent?.customLink == false,
		},
		{
			name: 'link',
			title: 'Link',
			type: 'string',
			hidden: ({ parent }: any) => parent?.customLink == false,
		},
		{
			name: 'page',
			title: 'Page',
			type: 'reference',
			to: [{ type: 'page' }],
			hidden: ({ parent }: any) => parent?.customLink == true,
		},
		{
			name: 'pageTitle',
			title: 'Page Title',
			description:
				'Overwrite page title - If left blank will use default page name',
			type: 'string',
			hidden: ({ parent }: any) => parent?.customLink == true,
		},
		{
			name: 'buttonType',
			title: 'Button Type',
			type: 'string',
			initialValue: 'primary',
			options: {
				list: ['primary', 'secondary', 'outline', 'link'],
			},
		},
		{
			name: 'buttonSize',
			title: 'Button Size',
			type: 'string',
			initialValue: 'default',
			options: {
				list: ['default', 'sm', 'xs'],
			},
		},
	],
	preview: {
		select: {
			title: 'page.name',
			displayName: 'displayName',
			pageTitle: 'pageTitle',
		},
		prepare(selection: any) {
			const { title, displayName, pageTitle } = selection;

			return {
				title:
					title && pageTitle
						? pageTitle
						: title
							? title
							: displayName,
			};
		},
	},
};

export default button;
