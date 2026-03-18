export type FormFieldType =
	| 'text'
	| 'email'
	| 'number'
	| 'tel'
	| 'textarea'
	| 'select'
	| 'checkbox';

export type FormField = {
	_key?: string;
	label: string;
	name: string;
	type: FormFieldType;
	required?: boolean;
	placeholder?: string;
	rows?: number;
	options?: string[];
};

export type FormDocumentType = {
	_id?: string;
	title?: string;
	formspreeFormId: string;
	submitLabel?: string;
	successMessage?: string;
	errorMessage?: string;
	fields: FormField[];
};
