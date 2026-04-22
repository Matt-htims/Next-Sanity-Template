import { EyeOpenIcon } from '@sanity/icons';
import type { DocumentActionComponent } from 'sanity';

export const PreviewAction: DocumentActionComponent = ({ draft, published }) => {
	const doc = (draft ?? published) as { slug?: { current?: string } } | null;
	const slug = doc?.slug?.current;

	const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
	const token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN ?? '';

	const previewUrl = slug
		? slug === '/'
			? `${baseUrl}/?preview=${token}`
			: `${baseUrl}/${slug.replace(/^\//, '')}?preview=${token}`
		: null;

	return {
		label: 'Open preview',
		icon: EyeOpenIcon,
		disabled: !previewUrl,
		title: !previewUrl ? 'Save a slug first' : undefined,
		onHandle: () => {
			if (previewUrl) {
				window.open(previewUrl, '_blank', 'noopener,noreferrer');
			}
		},
	};
};
