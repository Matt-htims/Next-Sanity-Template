import type { Metadata } from 'next';
import { getPage, getPageSeo, getPages } from '@/sanity/sanity-utils';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/lib/BlockRenderer';
import { revalidatePath } from 'next/cache';
import { createSlug, createSlugArray } from '@/lib/slugFunctions';

export const dynamicParams = false;

type Props = {
	params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
	revalidatePath('/', 'layout');

	const pages = await getPages();

	const pagesNoHome = pages.filter((page) => page.slug != '/');

	return pagesNoHome.map((page) => ({
		slug: createSlugArray(page.slug),
	}));
}

export async function generateMetadata({
	params,
}: Props): Promise<Metadata | null> {
	const { slug } = await params;
	const meta = await getPageSeo(createSlug(slug));

	if (!meta || !meta.seo || !meta.seo.seoTitle || !meta.seo.seoDescription)
		return null;

	return {
		title: meta.seo.seoTitle,
		description: meta.seo.seoTitle,
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const page = await getPage(createSlug(slug));

	if (!page) {
		return notFound();
	}

	const Blocks = page.content ? page.content : [];

	// return Blocks.map((block: any, index: number) => BlockRenderer(block, index));

	return (
		<>
			{Blocks.map((block: any, index: number) =>
				BlockRenderer(block, index),
			)}
		</>
	);
}
