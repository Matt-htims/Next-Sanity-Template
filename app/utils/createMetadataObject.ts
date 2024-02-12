import { MetaSite } from '@/types/Meta';

export default function createMetadataObject(meta: MetaSite) {
	const title = meta.seo?.seoTitle ? meta.seo.seoTitle : 'No metatitle';
	const description = meta.seo?.seoDescription
		? meta.seo.seoDescription
		: 'No metadescription';
	const favicon = meta.seo?.favicon?.asset?.url
		? meta.seo.favicon.asset.url
		: '';
	const opengraphImage = meta.seo?.opengraphImage?.asset?.url
		? meta.seo.opengraphImage.asset.url
		: '';

	if (favicon && opengraphImage) {
		return {
			title: title,
			description: description,
			icons: [
				{
					rel: 'icon',
					url: favicon,
				},
			],
			openGraph: {
				images: [
					{
						url: opengraphImage,
						width: 1200,
						height: 630,
						alt: title,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: title,
				description: description,
				images: [
					{
						url: opengraphImage,
						width: 1200,
						height: 630,
						alt: title,
					},
				],
			},
		};
	} else if (favicon && !opengraphImage) {
		return {
			title: title,
			description: description,
			icons: [
				{
					rel: 'icon',
					url: favicon,
				},
			],
		};
	} else if (!favicon && opengraphImage) {
		return {
			title: title,
			description: description,
			openGraph: {
				images: [
					{
						url: opengraphImage,
						width: 1200,
						height: 630,
						alt: title,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: title,
				description: description,
				images: [
					{
						url: opengraphImage,
						width: 1200,
						height: 630,
						alt: title,
					},
				],
			},
		};
	} else {
		return {
			title: title,
			description: description,
		};
	}
}
