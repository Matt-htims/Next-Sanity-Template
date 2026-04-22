'use client';

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '');
const TOKEN = process.env.NEXT_PUBLIC_PREVIEW_TOKEN ?? '';

interface PreviewPaneProps {
	document: {
		displayed?: {
			slug?: { current?: string };
		};
	};
}

export default function PreviewPane({ document }: PreviewPaneProps) {
	const slug = document?.displayed?.slug?.current;

	if (!BASE_URL || !TOKEN) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center', color: '#666' }}>
				<p>Set <code>NEXT_PUBLIC_BASE_URL</code> and <code>NEXT_PUBLIC_PREVIEW_TOKEN</code> in your environment to enable preview.</p>
			</div>
		);
	}

	if (!slug) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center', color: '#666' }}>
				<p>Add a slug to see a preview.</p>
			</div>
		);
	}

	const previewUrl =
		slug === '/'
			? `${BASE_URL}/?preview=${TOKEN}`
			: `${BASE_URL}/${slug.replace(/^\//, '')}?preview=${TOKEN}`;

	return (
		<iframe
			src={previewUrl}
			style={{ width: '100%', height: '100%', border: 'none' }}
			title="Page preview"
		/>
	);
}
