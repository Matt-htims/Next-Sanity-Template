import dynamic from 'next/dynamic';

const WireframeBlock = dynamic(
	() => import('../components/blocks/WireframeBlock'),
	{
		ssr: true,
	},
);

const PageIntro = dynamic(() => import('../components/blocks/PageIntro'), {
	ssr: true,
});

const ImageBlock = dynamic(() => import('../components/blocks/ImageBlock'), {
	ssr: true,
});

const StandaloneText = dynamic(
	() => import('../components/blocks/StandaloneText/StandaloneText'),
	{
		ssr: true,
	},
);

const Spacer = dynamic(() => import('../components/blocks/Spacer'), {
	ssr: true,
});

const ThemeSwitch = dynamic(() => import('../components/blocks/ThemeSwitch'), {
	ssr: true,
});

const ImageCarousel = dynamic(
	() => import('../components/blocks/ImageCarousel'),
	{
		ssr: true,
	},
);

const ImageText = dynamic(() => import('../components/blocks/ImageText'), {
	ssr: true,
});

const FadeExplainer = dynamic(
	() => import('../components/blocks/FadeExplainer'),
	{
		ssr: true,
	},
);

const LogoGrid = dynamic(() => import('../components/blocks/LogoGrid'), {
	ssr: true,
});

const ButtonBlock = dynamic(() => import('../components/blocks/ButtonBlock'), {
	ssr: true,
});

const TextStack = dynamic(() => import('../components/blocks/TextStack'), {
	ssr: true,
});

const TestimonialSlider = dynamic(
	() => import('../components/blocks/TestimonialSlider'),
	{
		ssr: true,
	},
);

const ImageCarouselLightbox = dynamic(
	() => import('../components/blocks/ImageCarouselLightbox'),
	{
		ssr: true,
	},
);

export default function BlockRenderer(block: any, index: number) {
	switch (block._type) {
		case 'WireframeBlock':
			return <WireframeBlock key={index} data={block} />;
		case 'ImageCarousel':
			return <ImageCarousel key={index} data={block} />;
		case 'PageIntro':
			return <PageIntro key={index} data={block} />;
		case 'StandaloneText':
			return <StandaloneText key={index} data={block} />;
		case 'Spacer':
			return <Spacer key={index} data={block} />;
		case 'ThemeSwitch':
			return <ThemeSwitch key={index} data={block} />;
		case 'ImageText':
			return <ImageText key={index} data={block} />;
		case 'ImageBlock':
			return <ImageBlock key={index} data={block} />;
		case 'LogoGrid':
			return <LogoGrid key={index} data={block} />;
		case 'FadeExplainer':
			return <FadeExplainer key={index} data={block} />;
		case 'ButtonBlock':
			return <ButtonBlock key={index} data={block} />;
		case 'TextStack':
			return <TextStack key={index} data={block} />;
		case 'TestimonialSlider':
			return <TestimonialSlider key={index} data={block} />;
		case 'ImageCarouselLightbox':
			return <ImageCarouselLightbox key={index} data={block} />;
		default:
			return null;
	}
}
