import { StopIcon } from '@sanity/icons';

const spacer = {
	name: 'Spacer',
	title: 'Spacer',
	type: 'object',
	icon: StopIcon,
	fields: [
		{
			name: 'spacerSize',
			title: 'Spacer Size',
			type: 'string',
			initialValue: '208px',
			options: {
				list: [
					'12px',
					'20px',
					'32px',
					'40px',
					'64px',
					'80px',
					'112px',
					'144px',
					'208px',
					'256px',
				],
			},
		},
		{
			name: 'mobileOnly',
			title: 'Mobile Only',
			type: 'boolean',
			initialValue: false,
		},
	],
	preview: {
		select: {
			title: 'spacerSize',
		},
		prepare(selection: any) {
			const { title } = selection;
			return {
				title: title + ' Spacer',
			};
		},
	},
};

export default spacer;
