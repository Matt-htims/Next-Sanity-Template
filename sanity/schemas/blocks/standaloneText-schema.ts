import { BlockContentIcon } from '@sanity/icons';
import truncateText from '@/lib/truncateText';
import { sanityTextStackWidthOptions } from '@/app/theme/layoutConfig';

const standaloneText = {
	name: 'StandaloneText',
	title: 'Text Block',
	type: 'object',
	icon: BlockContentIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Standalone Text',
			hidden: true,
		},
		{
			name: 'useSimpleText',
			title: 'Use Simple Text Input',
			type: 'boolean',
			initialValue: true,
		},
		{
			name: 'centered',
			title: 'Centered',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'simpleText',
			title: 'Simple Text',
			type: 'textWithOptions',
			description:
				'Use / for line breaks and surround words to highlight with []',
			hidden: ({ parent }: any) => parent?.useSimpleText == false,
		},
		{
			name: 'textAnimation',
			title: 'Text Animation',
			type: 'string',
			initialValue: 'fadeIn',
			hidden: ({ parent }: any) => parent?.useSimpleText == false,
			options: {
				list: [
					{ value: 'fadeIn', title: 'Fade in' },
					{ value: 'scrollReveal', title: 'Reveal on scroll' },
				],
			},
		},
		{
			name: 'richText',
			title: 'Rich Text',
			type: 'richText',
		},
		{
			name: 'maxWidth',
			title: 'Width',
			type: 'string',
			initialValue: 'default',
			options: {
				list: sanityTextStackWidthOptions,
			},
		},
	],
	preview: {
		select: {
			text: 'simpleText.text',
			richText: 'richText',
			useSimpleText: 'useSimpleText',
		},
		prepare(selection: any) {
			const { text, richText, useSimpleText } = selection;
			const truncatedTitle = text ? truncateText(text, 35) : ' ';
			return {
				title: useSimpleText ? truncatedTitle : 'Rich text',
			};
		},
	},
};

export default standaloneText;
