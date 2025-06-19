'use client';

import { ImageType } from '@/types/Image';
import CustomImage from '../atoms/CustomImage';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

// Animation
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

type ImageBlockProps = {
	data: {
		_key: string;
		_type: string;
		images: ImageType[];
	};
};

function CardSwiper({ image }: { image: ImageType }) {
	if (image.asset?.url) {
		return (
			<div className="scale-image relative aspect-3/2 w-full min-w-0 overflow-hidden rounded-site">
				<CustomImage
					image={image}
					sizes="(max-width: 768px) 100vw, 90vw"
					className="h-full w-full object-cover"
				/>
			</div>
		);
	} else return '';
}

export default function ImageBlock({ data }: ImageBlockProps) {
	let desktopRef = useRef(null);
	// let mobileRef = useRef(null);

	let { scrollYProgress: scrollYDesktop } = useScroll({
		target: desktopRef,
		offset: ['start end', 'end 0.7'],
	});

	// let { scrollYProgress: scrollYMobile } = useScroll({
	// 	target: mobileRef,
	// 	offset: ['start end', 'end end'],
	// });

	let scale = useTransform(scrollYDesktop, [0, 1], ['80%', '100%']);
	// let scaleMobile = useTransform(scrollYMobile, [0, 1], ['70%', '105%']);

	return (
		<>
			{/* <section
				ref={mobileRef}
				className="mb-15 mt-10 flex h-max justify-center overflow-hidden sm:my-10 md:my-15 md:hidden"
			>
				<motion.div
					style={{ scale: scaleMobile }}
					className="w-full md:w-10/12"
				>
					<swiper-container
						slides-per-view="1"
						autoplay-delay="3000"
						effect="fade"
						speed={1000}
					>
						{data.images?.map((image, index) => (
							<swiper-slide key={index}>
								<CardSwiper image={image} />
							</swiper-slide>
						))}
					</swiper-container>
				</motion.div>
			</section> */}
			<section
				ref={desktopRef}
				className="contained flex h-max justify-center overflow-hidden"
			>
				<motion.div style={{ scale }} className="w-full">
					<swiper-container
						slides-per-view="1"
						autoplay-delay="3000"
						effect="fade"
						speed={1000}
					>
						{data.images?.map((image, index) => (
							<swiper-slide key={index}>
								<CardSwiper image={image} />
							</swiper-slide>
						))}
					</swiper-container>
				</motion.div>
			</section>
		</>
	);
}

const animateImageGrow = {
	initial: {
		scale: 1,
	},
	animate: {
		scale: 1.2,
		transition: {
			duration: 4,
			ease: 'linear',
		},
	},
};
