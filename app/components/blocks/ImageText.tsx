'use client';
import CustomImage from '../atoms/CustomImage';
import RichText from '../atoms/RichText';
import { useRef } from 'react';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';

import { ImageType } from '@/types/Image';

type ImageTextProps = {
	data: {
		_key: string;
		_type: string;
		imageSide: string;
		image: ImageType;
		richText: Array<any>;
	};
};

export default function ImageText({ data }: ImageTextProps) {
	let ref = useRef(null);
	let textRef = useRef(null);
	const isInViewText = useInView(textRef, { amount: 0.3, once: true });

	let { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	let y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
	return (
		<section
			ref={ref}
			className="contained mt-10 mb-24 grid grid-cols-12 items-center overflow-visible overflow-x-clip min-[980px]:mt-36 min-[980px]:mb-52"
		>
			<motion.div
				style={{ y }}
				className={`relative col-span-12 aspect-3/2 overflow-hidden rounded-site min-[980px]:col-span-6 min-[980px]:aspect-29/25 xl:col-span-5 ${
					data.imageSide == 'left'
						? 'mb-10 min-[980px]:col-start-1 min-[980px]:mb-0 xl:col-start-2'
						: 'mb-10 min-[980px]:order-2 min-[980px]:col-start-7 min-[980px]:mb-0 xl:col-start-7'
				}`}
			>
				<CustomImage
					image={data.image}
					sizes="(max-width: 768px) 100vw, 90vw"
					className="h-full w-full object-cover"
				/>
			</motion.div>
			<motion.div
				variants={textAnimation}
				initial="initial"
				animate={isInViewText ? 'animate' : 'initial'}
				ref={textRef}
				className={`col-span-12 flex h-max items-center min-[980px]:col-span-5 min-[980px]:h-full min-[980px]:px-0 xl:col-span-4 ${
					data.imageSide == 'left'
						? 'min-[980px]:col-start-8 xl:col-start-8'
						: 'min-[980px]:order-1 min-[980px]:col-start-1 xl:col-start-2'
				}`}
			>
				<RichText data={data.richText} />
			</motion.div>
		</section>
	);
}

// Animations
const textAnimation = {
	initial: {
		opacity: 0,
		y: 10,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: 'easeInOut',
		},
	},
};
