import {
	layoutWidthBaseClassName,
	layoutWidthClassMap,
	type textStackWidthOption,
} from '@/app/theme/layoutConfig';
import { cn } from '@/lib/utils';

export function normalizeLayoutWidthOption(
	value?: string,
): textStackWidthOption {
	if (value === 'default' || value === 'wide' || value === 'narrow') {
		return value;
	}

	return 'default';
}

export function getLayoutWidthClassName(value?: string): string {
	const normalizedWidth = normalizeLayoutWidthOption(value);
	const widthClass = layoutWidthClassMap[normalizedWidth];

	return cn(layoutWidthBaseClassName, widthClass);
}
