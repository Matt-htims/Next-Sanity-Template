import { EditIcon } from '@sanity/icons';

const formField = {
	name: 'formField',
	title: 'Form Field',
	type: 'object',
	icon: EditIcon,
	fields: [
		{
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'name',
			title: 'Field Name',
			type: 'string',
			description:
				'Unique field key sent to Formspree, e.g. fullName, email, company_name.',
			validation: (Rule: any) =>
				Rule.required().regex(/^[A-Za-z][A-Za-z0-9_-]*$/, {
					name: 'field name',
				}),
		},
		{
			name: 'type',
			title: 'Field Type',
			type: 'string',
			initialValue: 'text',
			options: {
				list: [
					{ title: 'Text', value: 'text' },
					{ title: 'Email', value: 'email' },
					{ title: 'Number', value: 'number' },
					{ title: 'Phone', value: 'tel' },
					{ title: 'Textarea', value: 'textarea' },
					{ title: 'Select', value: 'select' },
					{ title: 'Checkbox', value: 'checkbox' },
				],
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'required',
			title: 'Required',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'placeholder',
			title: 'Placeholder',
			type: 'string',
			hidden: ({ parent }: any) =>
				parent?.type === 'checkbox' || parent?.type === 'select',
		},
		{
			name: 'rows',
			title: 'Rows',
			type: 'number',
			initialValue: 4,
			hidden: ({ parent }: any) => parent?.type !== 'textarea',
			validation: (Rule: any) => Rule.min(2).max(12),
		},
		{
			name: 'options',
			title: 'Select Options',
			type: 'array',
			of: [{ type: 'string' }],
			hidden: ({ parent }: any) => parent?.type !== 'select',
			validation: (Rule: any) =>
				Rule.custom((value: any, context: any) => {
					if (context?.parent?.type !== 'select') return true;
					if (!Array.isArray(value) || value.length === 0) {
						return 'Add at least one option for select fields.';
					}
					return true;
				}),
		},
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'type',
		},
	},
};

export default formField;
