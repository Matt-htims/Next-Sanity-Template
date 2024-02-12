import { getPage } from '@/sanity/sanity-utils';
import BlockRenderer from '../utils/BlockRenderer';

export default async function Home() {
	const page = await getPage('/');
	const Blocks = page?.content ? page.content : [];
	return Blocks.map((block: any, index: number) => BlockRenderer(block, index));
}
