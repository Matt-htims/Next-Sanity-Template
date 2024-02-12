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
			initialValue: '50px',
			options: {
				list: [
					'10px',
					'20px',
					'50px',
					'100px',
					'150px',
					{ value: '200pxSm', title: '200px Smaller on mobile' },
					'200px',
					'250px',
				],
			},
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
