import { BlockContentIcon, TextIcon } from '@sanity/icons';
import truncateText from '@/app/utils/truncateText';

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
			name: 'simpleText',
			title: 'Simple Text',
			type: 'text',
			description:
				'Use / for line breaks and surround words to highlight with []',
			rows: 6,
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
			description:
				'Able to customise text color and display style. Change Text Style if the Type and Style differ, e.g. a H2 that should look like a H1.',
			type: 'array',
			hidden: ({ parent }: any) => parent?.useSimpleText == true,
			of: [
				{
					type: 'block',
					marks: {
						annotations: [
							{ type: 'textColor' },
							{
								name: 'textStyle',
								title: 'Text Style',
								type: 'object',
								icon: TextIcon,
								fields: [
									{
										name: 'textStyle',
										title: 'Text Style',
										type: 'string',
										initialValue: 'h3',
										options: {
											list: [
												{ value: 'h1', title: 'H1' },
												{ value: 'h2', title: 'H2' },
												{ value: 'h3', title: 'H3' },
												{ value: 'h4', title: 'H4' },
												{
													value: 'body',
													title: 'body',
												},
											],
										},
									},
								],
							},
						],
					},
				},
			],
		},
		{
			name: 'textOptions',
			title: 'Text Options',
			type: 'object',
			hidden: ({ parent }: any) => parent?.useSimpleText == false,
			options: {
				collapsible: true,
				collapsed: true,
				columns: 2,
				modal: { type: 'popover' },
			},
			fields: [
				{
					name: 'textType',
					title: 'Text Type',
					type: 'string',
					initialValue: 'h3',
					options: {
						list: [
							{ value: 'h1', title: 'H1' },
							{ value: 'h2', title: 'H2' },
							{ value: 'h3', title: 'H3' },
							{ value: 'h4', title: 'H4' },
							{ value: 'p', title: 'Paragraph' },
						],
					},
				},
				{
					name: 'textStyle',
					title: 'Text Style',
					type: 'string',
					initialValue: 'h3',
					hidden: ({ parent }: any) => parent?.useSimpleText == true,
					options: {
						list: [
							{ value: 'h1', title: 'H1' },
							{ value: 'h2', title: 'H2' },
							{
								value: 'h2Large',
								title: 'H2 - Larger on mobile',
							},
							{ value: 'h3', title: 'H3' },
							{ value: 'h4', title: 'H4' },
							{ value: 'body', title: 'Body' },
						],
					},
				},
				{
					name: 'centreAlignText',
					title: 'Center Align Text',
					type: 'boolean',
					initialValue: false,
				},
			],
		},
		{
			name: 'positionOptions',
			title: 'Position Options',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
				columns: 2,
				modal: { type: 'popover' },
			},
			fields: [
				{
					name: 'alignment',
					title: 'Alignment',
					description: 'The column the block starts at.',
					type: 'string',
					initialValue: '2',
					options: {
						list: [
							{ value: '1', title: 'Column 1' },
							{ value: '2', title: 'Column 2' },
							{ value: '3', title: 'Column 3' },
							{ value: '4', title: 'Column 4' },
							{ value: '6', title: 'Column 6' },
						],
					},
				},
				{
					name: 'width',
					title: 'Width',
					description: 'In columns',
					type: 'string',
					initialValue: 'w-5/12',
					options: {
						list: [
							{ value: 'w-5/12', title: '5/12' },
							{ value: 'w-6/12', title: '6/12' },
							{ value: 'w-7/12', title: '7/12' },
							{ value: 'w-8/12', title: '8/12' },
							{ value: 'w-9/12', title: '9/12' },
							{ value: 'w-10/12', title: '10/12' },
							{ value: 'w-12/12', title: '12/12' },
						],
					},
				},
			],
		},
	],
	preview: {
		select: {
			text: 'simpleText',
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
