import { TransferIcon } from '@sanity/icons';

const themeSwitch = {
	name: 'ThemeSwitch',
	title: 'Theme Switch',
	type: 'object',
	icon: TransferIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Theme Switch',
			hidden: true,
		},
		{
			name: 'theme',
			title: 'Theme',
			type: 'string',
			initialValue: 'light',
			options: {
				list: ['light', 'dark'],
			},
		},
	],
};

export default themeSwitch;
