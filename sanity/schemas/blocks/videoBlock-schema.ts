import { PlayIcon } from '@sanity/icons';

const videoBlock = {
	name: 'VideoBlock',
	title: 'Video Block',
	type: 'object',
	icon: PlayIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Video Block',
			hidden: true,
		},
		{
			name: 'videoThumbnail',
			title: 'Video Thumbnail',
			type: 'url',
		},
		{
			name: 'videoSource',
			title: 'Video Source',
			type: 'url',
		},
	],
};

export default videoBlock;
