'use client';

import { useRef } from 'react';
import CustomImage from '../atoms/CustomImage';
import { ImageType } from '@/types/Image';
import Marquee from 'react-fast-marquee';
import Fancybox from '@/app/ui/FancyBox';
import CornerSmoothing from '../atoms/CornerSmoothing';

type ImageCarouselLightboxProps = {
	data: {
		_key: string;
		_type: string;
		images: ImageType[];
		images2: ImageType[];
	};
};

function Card({
	data,
	index,
	enableFancybox = false,
	onClick,
}: {
	data: ImageType;
	index?: number;
	enableFancybox?: boolean;
	onClick?: () => void;
}) {
	const anchorProps = enableFancybox
		? {
				'data-fancybox': 'gallery',
				href: data.asset.url + '?w=1200&fit=max',
			}
		: {
				href: '#',
			};

	return (
		<a
			{...anchorProps}
			className={`xxl:mr-5 relative mr-3 aspect-[33/38] h-[380px] overflow-hidden rounded-site md:mr-4`}
			onClick={(e) => {
				if (onClick) {
					e.preventDefault(); // prevent default anchor behavior
					onClick();
				}
			}}
		>
			<CornerSmoothing className="h-full w-full">
				<CustomImage
					image={data}
					sizes="(max-width: 768px) 90vw, 60vw"
					className="h-full w-full object-cover"
				/>
			</CornerSmoothing>
		</a>
	);
}

export default function ImageCarouselLightbox({
	data,
}: ImageCarouselLightboxProps) {
	const fancyboxRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	const handleClick = (index: number) => {
		const el = fancyboxRefs.current[index];
		if (el) el.click(); // Trigger the hidden anchor
	};

	const allImages = [...data.images, ...data.images2];

	return (
		<section>
			{/* Hidden Fancybox-enabled links */}
			<Fancybox
				options={{
					Carousel: { infinite: false },
					Toolbar: {
						display: {
							left: [],
							middle: [],
							right: ['close'],
						},
					},
				}}
			>
				<div className="hidden">
					{allImages.map((image, index) => (
						<a
							key={`fancybox-${index}`}
							data-fancybox="gallery"
							href={image.asset.url + '?w=1200&fit=max'}
							ref={(el) => {
								fancyboxRefs.current[index] = el;
							}}
						/>
					))}
				</div>
			</Fancybox>

			{/* Marquee with clickable images */}
			<div className="xxl:mb-5 mb-3 max-h-[400px] md:mb-4">
				<Marquee speed={40} direction="left" autoFill={true}>
					<div className="flex">
						{data.images?.map((image, index) => (
							<Card
								key={`marquee1-${index}`}
								data={image}
								index={index}
								onClick={() => handleClick(index)}
							/>
						))}
					</div>
				</Marquee>
			</div>

			<div className="max-h-[400px]">
				<Marquee speed={40} direction="right" autoFill={true}>
					<div className="flex">
						{data.images2?.map((image, index) => (
							<Card
								key={`marquee2-${index}`}
								data={image}
								index={data.images.length + index}
								onClick={() =>
									handleClick(data.images.length + index)
								}
							/>
						))}
					</div>
				</Marquee>
			</div>
		</section>
	);
}
