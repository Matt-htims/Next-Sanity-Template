import { getPage } from '@/sanity/sanity-utils';
import BlockRenderer from '@/lib/BlockRenderer';

type Props = {
	searchParams: Promise<{ preview?: string }>;
};

export default async function Home({ searchParams }: Props) {
	const { preview } = await searchParams;

	const isPreview =
		!!preview &&
		!!process.env.SANITY_PREVIEW_TOKEN &&
		preview === process.env.SANITY_PREVIEW_TOKEN;

	const page = await getPage('/', { preview: isPreview });
	const Blocks = page?.content ? page.content : [];

	return (
		<>
			{Blocks.map((block: any, index: number) =>
				BlockRenderer(block, index),
			)}
		</>
	);
}
