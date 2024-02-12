'use client';
import Image from 'next/image';
import { ImageType } from '@/types/Image';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

type ImageCarouselProps = {
	data: {
		_key: string;
		_type: string;
		images: ImageType[];
	};
};

function Card({ data }: { data: ImageType }) {
	function imageStyle(carouselSize: string) {
		switch (carouselSize) {
			case 'landscape':
				return 'flex-[0_0_83.333%] md:flex-[0_0_58%] xl:flex-[0_0_820px] aspect-[41/35]';
			case 'square':
				return 'flex-[0_0_66.666%] md:flex-[0_0_50%] xl:flex-[0_0_700px] aspect-square';
			case 'portrait':
				return 'flex-[0_0_58.333%] md:flex-[0_0_42%] xl:flex-[0_0_580px] aspect-[29/35]';
			case 'portraitNarrow':
				return 'flex-[0_0_50%] md:flex-[0_0_33.333%] xl:flex-[0_0_460px] aspect-[23/35]';
			default:
				return '';
		}
	}
	return (
		<div
			className={`embla__slide relative mr-1 max-h-[700px] min-w-0 overflow-hidden rounded-site md:mr-2 ${imageStyle(
				data.carouselSize ?? '',
			)}`}
		>
			<Image
				src={data.asset.url}
				alt={data.alt}
				fill
				sizes='"(max-width: 768px) 100vw, 90vw"'
				style={{ objectFit: 'cover' }}
				placeholder="blur"
				blurDataURL={data.asset.metadata.lqip}
			/>
		</div>
	);
}

export default function ImageCarousel({ data }: ImageCarouselProps) {
	const OPTIONS: EmblaOptionsType = {
		// dragFree: true,
		align: 'center',
		loop: true,
		duration: 20000,
		// containScroll: 'trimSnaps',
	};

	// const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
		Autoplay({ delay: 0 }),
	]);
	return (
		<section className="pointer-events-none max-h-[700px]">
			<div className="embla" ref={emblaRef}>
				<div className="embla__container flex">
					{data.images.map((image, index) => (
						<Card data={image} key={index} />
					))}
				</div>
			</div>
		</section>
	);
}
