'use client';

import { ImageType } from '@/types/Image';
import CustomImage from '../atoms/CustomImage';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// Animation
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { animateChildUp } from '@/lib/animations';
import { easeInOutCurve } from '@/lib/animations/easings';
import { useWindowSize } from '@uidotdev/usehooks';
import CornerSmoothing from '../atoms/CornerSmoothing';
import { Container } from '../atoms/Container';

type ImageBlockProps = {
	data: {
		_key: string;
		_type: string;
		images: ImageType[];
	};
};

export default function ImageBlock({ data }: ImageBlockProps) {
	let desktopRef = useRef(null);
	// let mobileRef = useRef(null);

	useEffect(() => {
		register();
	}, []);

	const { width } = useWindowSize();

	let { scrollYProgress: scrollYDesktop } = useScroll({
		target: desktopRef,
		offset: ['start end', 'end 0.7'],
	});

	// let { scrollYProgress: scrollYMobile } = useScroll({
	// 	target: mobileRef,
	// 	offset: ['start end', 'end end'],
	// });

	let scale = useTransform(
		scrollYDesktop,
		[0, 1],
		['80%', width && width < 1024 ? '100%' : '100%'],
	);
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
			<Container as="section" ref={desktopRef}>
				<motion.div
					variants={animateChildUp}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					style={{
						scale,
						// borderRadius:
						// 	width && width < 1024 ? borderRadiusMobile : '8px',
					}}
					className="flex h-max justify-center overflow-hidden"
				>
					<div className="aspect-5/3 w-full overflow-hidden">
						<CornerSmoothing className="h-full w-full">
							<ImagesWithEffect images={data.images} />
						</CornerSmoothing>
					</div>
				</motion.div>
			</Container>
		</>
	);
}
function ImagesWithEffect({ images }: { images: ImageType[] }) {
	const swiperRef = useRef<any>(null);

	useEffect(() => {
		const swiperEl = swiperRef.current;
		if (!swiperEl) return;

		Object.assign(swiperEl, {
			slidesPerView: 1,
			autoplay: { delay: 5000 },
			loop: true,
			effect: 'fade',
			speed: 1500,
		});

		swiperEl.initialize?.();
	}, []);

	return (
		<motion.div
			initial={images.length > 1 ? { scale: 1.1, x: 10 } : {}}
			animate={{ scale: 1, x: 0 }}
			transition={{
				// ease: cubicBezier(0.33, 1, 0.68, 1),
				ease: easeInOutCurve,
				duration: 5,
				delay: 0.6,
			}}
			className="images-with-effect h-full w-full overflow-hidden"
		>
			<div className="h-full w-full">
				<swiper-container
					ref={swiperRef}
					init={false}
					style={{ height: '100%' }}
				>
					{images?.map((image, index) => (
						<swiper-slide key={index} className="">
							<IndividualImage index={index} image={image} />
						</swiper-slide>
					))}
					{images.length == 2 &&
						images?.map((image, index) => (
							<swiper-slide key={index} className="">
								<IndividualImage index={index} image={image} />
							</swiper-slide>
						))}
				</swiper-container>
			</div>
		</motion.div>
	);
}

function IndividualImage({
	image,
	index,
}: {
	image: ImageType;
	index: number;
}) {
	if (image.asset?.url) {
		const width = image.asset.metadata.dimensions?.width;
		const height = image.asset.metadata.dimensions?.height;
		return (
			<div className="scale-image relative h-full w-[calc(100%+40px)]">
				<CustomImage
					image={image}
					sizes={
						width && height && width < height
							? '(max-width: 768px) 110vw, 100vw'
							: '(max-width: 768px) 150vw, 100vw'
					}
					className="h-full w-full object-cover"
					priority={index > 0 ? false : true}
					loading="eager"
				/>
			</div>
		);
	} else return '';
}
