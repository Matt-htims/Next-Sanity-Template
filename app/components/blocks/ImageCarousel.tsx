'use client';
import CustomImage from '../atoms/CustomImage';
import { ImageType } from '@/types/Image';

import Marquee from 'react-fast-marquee';

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
				return 'w-[calc(100vw*0.89132)] md:w-[calc(100vw*0.59419)] xl:w-[820px] aspect-41/35';
			case 'square':
				return 'w-[calc(100vw*0.76089)] md:w-[calc(100vw*0.507228)] xl:w-[700px] aspect-square';
			case 'portrait':
				return 'w-[calc(100vw*0.63045)] md:w-[calc(100vw*0.420278)] xl:w-[580px] aspect-29/35';
			case 'portraitNarrow':
				return 'w-[calc(100vw*0.50)] md:w-[calc(100vw*0.33333)] xl:w-[460px] aspect-23/35';
			default:
				return '';
		}
	}

	function imageSize(carouselSize: string) {
		switch (carouselSize) {
			case 'landscape':
				return '(max-width: 768px) 90vw, 60vw';
			case 'square':
				return '(max-width: 768px) 80vw, 50vw';
			case 'portrait':
				return '(max-width: 768px) 70vw, 40vw';
			case 'portraitNarrow':
				return '(max-width: 768px) 60vw, 30vw';
			default:
				return '';
		}
	}
	return (
		<div
			className={`relative mr-1 max-h-[700px] overflow-hidden rounded-site md:mr-5 ${imageStyle(
				data.carouselSize ?? '',
			)}`}
		>
			<CustomImage
				image={data}
				sizes={imageSize(data.carouselSize ?? '')}
				className="h-full w-full object-cover"
			/>
		</div>
	);
}

export default function ImageCarousel({ data }: ImageCarouselProps) {
	return (
		<section className="pointer-events- max-h-[700px]">
			<Marquee speed={70}>
				<div className="flex">
					{data.images?.map((image, index) => (
						<Card data={image} key={index} />
					))}
				</div>
			</Marquee>
		</section>
	);
}
