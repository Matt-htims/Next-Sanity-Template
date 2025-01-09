import { TiersIcon } from '@sanity/icons';

const wireFrameBlock = {
	name: 'WireframeBlock',
	title: 'Wireframe Block',
	type: 'object',
	icon: TiersIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Wireframe Block',
			hidden: true,
		},
		{
			name: 'blockName',
			title: 'Block Name',
			type: 'string',
		},
		{
			name: 'description',
			type: 'text',
			rows: 3,
		},
		{
			name: 'blockHeight',
			title: 'Block Height',
			type: 'string',
			initialValue: '50vh',
			options: {
				list: ['50vh', '25vh', '75vh'],
			},
		},
	],
};

export default wireFrameBlock;
