'use client';

import { useMemo, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

import { cn } from '@/lib/utils';
import { Button } from '@/app/ui/Button';
import ButtonInnerAnimation from '../../atoms/ButtonInnerAnimation';
import Honeypot from './Honeypot';
import type { FormDocumentType, FormField } from '@/types/Form';
import { Text } from '../../atoms/Text';
import CornerSmoothing from '../../atoms/CornerSmoothing';

type FormspreeFormProps = {
	form: FormDocumentType;
	className?: string;
};

function toInputId(name: string, key?: string) {
	const safeName = name.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
	return key ? `${safeName}-${key}` : safeName;
}

function renderField(
	field: FormField,
	selectValue: string,
	onSelectChange: (value: string) => void,
	onFieldChange: () => void,
	hasError?: boolean,
) {
	const fieldId = toInputId(field.name, field._key);
	const baseClass =
		'w-full rounded-controls border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/40';

	if (field.type === 'textarea') {
		return (
			<textarea
				id={fieldId}
				name={field.name}
				required={field.required}
				rows={field.rows || 4}
				placeholder={field.placeholder || field.label}
				onChange={onFieldChange}
				aria-invalid={hasError}
				className={cn(baseClass, 'resize-y')}
			/>
		);
	}

	if (field.type === 'select') {
		return (
			<div className="relative">
				<select
					id={fieldId}
					name={field.name}
					required={field.required}
					value={selectValue}
					onChange={(event) => {
						onSelectChange(event.target.value);
						onFieldChange();
					}}
					aria-invalid={hasError}
					className={cn(
						baseClass,
						'appearance-none pr-12',
						!selectValue && 'text-black/40',
					)}
				>
					<option value="" disabled>
						Select {field.label}
					</option>
					{field.options?.map((option, index) => (
						<option
							key={`${field._key || field.name}-${index}`}
							value={option}
						>
							{option}
						</option>
					))}
				</select>
				<span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black/50">
					<svg
						width="12"
						height="8"
						viewBox="0 0 12 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M1 1.25L6 6.25L11 1.25"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>
		);
	}

	if (field.type === 'checkbox') {
		return (
			<label
				htmlFor={fieldId}
				className="inline-flex items-center gap-2.5 text-sm text-black"
			>
				<input
					id={fieldId}
					type="checkbox"
					name={field.name}
					required={field.required}
					onChange={onFieldChange}
					aria-invalid={hasError}
					className="h-4 w-4 rounded border-black/30"
				/>
				<span>{field.label}</span>
			</label>
		);
	}

	return (
		<input
			id={fieldId}
			type={field.type}
			name={field.name}
			required={field.required}
			placeholder={field.placeholder || field.label}
			onChange={onFieldChange}
			aria-invalid={hasError}
			className={baseClass}
		/>
	);
}

export default function FormspreeForm({ form, className }: FormspreeFormProps) {
	const [state, handleSubmit] = useForm(form.formspreeFormId);
	const [selectValues, setSelectValues] = useState<Record<string, string>>(
		{},
	);
	const [requiredErrors, setRequiredErrors] = useState<
		Record<string, string>
	>({});

	const validFields = useMemo(
		() =>
			(form.fields || []).filter(
				(field) => field?.name && field?.label && field?.type,
			),
		[form.fields],
	);

	const clearRequiredError = (fieldName: string) => {
		setRequiredErrors((prev) => {
			if (!prev[fieldName]) return prev;
			const next = { ...prev };
			delete next[fieldName];
			return next;
		});
	};

	const validateRequiredFields = (formElement: HTMLFormElement) => {
		const formData = new FormData(formElement);
		const nextErrors: Record<string, string> = {};

		for (const field of validFields) {
			if (!field.required) continue;

			const value = formData.get(field.name);
			const isEmpty =
				field.type === 'checkbox'
					? !value
					: !String(value ?? '').trim();

			if (isEmpty) {
				nextErrors[field.name] = `${field.label} is required.`;
			}
		}

		return nextErrors;
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextErrors = validateRequiredFields(event.currentTarget);
		if (Object.keys(nextErrors).length > 0) {
			setRequiredErrors(nextErrors);
			return;
		}

		setRequiredErrors({});
		await handleSubmit(event);
	};

	if (!form.formspreeFormId || validFields.length === 0) return null;

	if (state.succeeded) {
		return (
			<Text
				as={'p'}
				textStyle={'body'}
				className={cn('text-black', className)}
			>
				{form.successMessage || 'Thanks, your form has been submitted.'}
			</Text>
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			className={cn('relative space-y-4 text-left', className)}
			noValidate
		>
			<Honeypot name="_gotcha" />
			{validFields.map((field) => (
				<div key={field._key || field.name} className="space-y-2">
					{field.type !== 'checkbox' && (
						<label
							htmlFor={toInputId(field.name, field._key)}
							className="block text-sm font-medium text-black"
						>
							{field.label}
							{field.required ? ' *' : ''}
						</label>
					)}
					{renderField(
						field,
						selectValues[field._key || field.name] || '',
						(value) => {
							const key = field._key || field.name;
							setSelectValues((prev) => ({
								...prev,
								[key]: value,
							}));
						},
						() => clearRequiredError(field.name),
						Boolean(requiredErrors[field.name]),
					)}
					{requiredErrors[field.name] && (
						<Text
							as={'p'}
							textStyle={'body-small'}
							className="text-feedback-error-text"
						>
							{requiredErrors[field.name]}
						</Text>
					)}
					<ValidationError
						prefix={field.label}
						field={field.name}
						errors={state.errors}
					/>
				</div>
			))}

			<div className="pt-2">
				<CornerSmoothing className="w-max" themeRadiusFamily="controls">
					<Button
						type="submit"
						disabled={state.submitting}
						className="bg-accent"
					>
						<ButtonInnerAnimation>
							{state.submitting
								? 'Submitting...'
								: form.submitLabel || 'Submit'}
						</ButtonInnerAnimation>
					</Button>
				</CornerSmoothing>
			</div>

			{state.errors && (
				<Text
					as={'p'}
					textStyle={'body-small'}
					className="text-feedback-error-text"
				>
					{form.errorMessage ||
						'An error occurred. Please try again.'}
				</Text>
			)}
		</form>
	);
}
