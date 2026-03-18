import { ClipboardIcon } from '@sanity/icons';

const form = {
	name: 'form',
	title: 'Forms',
	type: 'document',
	icon: ClipboardIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'formspreeFormId',
			title: 'Formspree Form ID',
			type: 'string',
			description: 'The Formspree endpoint ID, for example xjggvwbz.',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'submitLabel',
			title: 'Submit Button Label',
			type: 'string',
			initialValue: 'Submit',
		},
		{
			name: 'successMessage',
			title: 'Success Message',
			type: 'text',
			rows: 3,
			initialValue: 'Thanks, your form has been submitted.',
		},
		{
			name: 'errorMessage',
			title: 'Error Message',
			type: 'text',
			rows: 2,
			initialValue: 'An error occurred. Please try again.',
		},
		{
			name: 'fields',
			title: 'Fields',
			type: 'array',
			of: [{ type: 'formField' }],
			validation: (Rule: any) => Rule.required().min(1),
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'formspreeFormId',
		},
		prepare(selection: any) {
			const { title, subtitle } = selection;
			return {
				title,
				subtitle: subtitle
					? `Formspree ID: ${subtitle}`
					: 'No Formspree ID',
			};
		},
	},
};

export default form;
