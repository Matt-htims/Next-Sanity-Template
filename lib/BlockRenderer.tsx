import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const WireframeBlock = dynamic(
	() => import('@/app/components/blocks/_dev/WireframeBlock'),
	{
		ssr: true,
	},
);

const PageIntro = dynamic(() => import('@/app/components/blocks/PageIntro'), {
	ssr: true,
});

const ImageBlock = dynamic(() => import('@/app/components/blocks/ImageBlock'), {
	ssr: true,
});

const StandaloneText = dynamic(
	() => import('@/app/components/blocks/StandaloneText/StandaloneText'),
	{
		ssr: true,
	},
);

const Spacer = dynamic(() => import('@/app/components/blocks/Spacer'), {
	ssr: true,
});

const ThemeSwitch = dynamic(
	() => import('@/app/components/blocks/ThemeSwitch'),
	{
		ssr: true,
	},
);

const ImageCarousel = dynamic(
	() => import('@/app/components/blocks/ImageCarousel'),
	{
		ssr: true,
	},
);

const ImageText = dynamic(() => import('@/app/components/blocks/ImageText'), {
	ssr: true,
});

const LogoGrid = dynamic(() => import('@/app/components/blocks/LogoGrid'), {
	ssr: true,
});

const ButtonBlock = dynamic(
	() => import('@/app/components/blocks/ButtonBlock'),
	{
		ssr: true,
	},
);

const TextStack = dynamic(() => import('@/app/components/blocks/TextStack'), {
	ssr: true,
});

const TestimonialSlider = dynamic(
	() => import('@/app/components/blocks/TestimonialSlider'),
	{
		ssr: true,
	},
);

const VideoBlock = dynamic(() => import('@/app/components/blocks/VideoBlock'), {
	ssr: true,
});

const Section = dynamic(() => import('@/app/components/blocks/Section'), {
	ssr: true,
});

type BlockData = {
	_type?: string;
	_key?: string;
	[key: string]: any;
};

type BlockComponent = ComponentType<any>;

const blockComponentMap: Record<string, BlockComponent> = {
	Section,
	WireframeBlock,
	ImageCarousel,
	PageIntro,
	StandaloneText,
	Spacer,
	ThemeSwitch,
	ImageText,
	ImageBlock,
	LogoGrid,
	ButtonBlock,
	TextStack,
	TestimonialSlider,
	VideoBlock,
};

export default function BlockRenderer(block: BlockData, index: number) {
	const Component = block?._type ? blockComponentMap[block._type] : undefined;

	if (!Component) {
		return null;
	}

	const key = block._key || `${block._type}-${index}`;

	return <Component key={key} data={block} />;
}
