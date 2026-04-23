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
				return 'aspect-41/35';
			case 'square':
				return 'aspect-square';
			case 'portrait':
				return ' aspect-29/35';
			case 'portraitNarrow':
				return 'aspect-23/35';
			default:
				return 'aspect-square';
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
				return '(max-width: 768px) 80vw, 50vw';
		}
	}
	return (
		<div
			className={`relative mr-3 h-[300px] md:h-[700px] overflow-hidden rounded-site md:mr-5 ${imageStyle(
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
		<section className="">
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
