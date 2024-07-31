'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import {
	motion,
	useScroll,
	useMotionValueEvent,
	useTransform,
} from 'framer-motion';
import { Text } from '../atoms/Text';

import { ImageType } from '@/types/Image';
import imageText from '@/sanity/schemas/blocks/imageText-schema';

import { breakText } from '@/app/utils/breakText';

type FadeExplainerProps = {
	data: {
		_key: string;
		_type: string;
		imageTextPairs: Array<{
			image: ImageType;
			heading: string;
			body: string;
		}>;
	};
};

export default function FadeExplainer({ data }: FadeExplainerProps) {
	const fadeExplainerNumber = data.imageTextPairs.length;

	const [scrollProgress, setScrollProgress] = useState(0);
	const [scrollProgressT1, setScrollProgressT1] = useState(0);
	const [scrollProgressT2, setScrollProgressT2] = useState(0);
	const [scrollProgressT3, setScrollProgressT3] = useState(0);
	const [scrollProgressT4, setScrollProgressT4] = useState(0);
	const textScrolls = [
		scrollProgressT1,
		scrollProgressT2,
		scrollProgressT3,
		scrollProgressT4,
	];

	const [scrollProgressScale, setScrollProgressScale] = useState(0);

	// Refs
	const ref = useRef(null);
	const textRef1 = useRef(null);
	const textRef2 = useRef(null);
	const textRef3 = useRef(null);
	const textRef4 = useRef(null);
	const textRefs = [textRef1, textRef2, textRef3, textRef4];

	const imageZs = ['z-40', 'z-30', 'z-20', 'z-10', 'z-0'];

	const { scrollYProgress: scrollImage } = useScroll({
		target: ref,
		offset: ['start 0.001', 'end start'],
	});

	useMotionValueEvent(scrollImage, 'change', (latest) => {
		setScrollProgress(latest);
	});

	// Scroll Text 1
	const { scrollYProgress: scrollText1 } = useScroll(
		fadeExplainerNumber > 1
			? {
					target: textRef1,
					offset: ['start end', 'start start'],
				}
			: { axis: 'x' },
	);

	useMotionValueEvent(scrollText1, 'change', (latest) => {
		if (fadeExplainerNumber > 1) {
			setScrollProgressT1(latest);
		}
	});

	// Scroll Text 2
	const { scrollYProgress: scrollText2 } = useScroll(
		fadeExplainerNumber > 2
			? {
					target: textRef2,
					offset: ['start end', 'start start'],
				}
			: { axis: 'x' },
	);

	useMotionValueEvent(scrollText2, 'change', (latest) => {
		if (fadeExplainerNumber > 2) {
			setScrollProgressT2(latest);
		}
	});

	// Scroll Text 3
	const { scrollYProgress: scrollText3 } = useScroll(
		fadeExplainerNumber > 3
			? {
					target: textRef3,
					offset: ['start end', 'start start'],
				}
			: { axis: 'x' },
	);

	useMotionValueEvent(scrollText3, 'change', (latest) => {
		if (fadeExplainerNumber > 3) {
			setScrollProgressT3(latest);
		}
	});

	// Scroll Text 4
	const { scrollYProgress: scrollText4 } = useScroll(
		fadeExplainerNumber > 4
			? {
					target: textRef4,
					offset: ['start end', 'start start'],
				}
			: { axis: 'x' },
	);

	useMotionValueEvent(scrollText4, 'change', (latest) => {
		if (fadeExplainerNumber > 4) {
			setScrollProgressT4(latest);
		}
	});

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'start 0.25'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		setScrollProgressScale(latest);
	});

	let scale = useTransform(scrollYProgress, [0, 1], ['85%', '100%']);

	return (
		<section>
			<div
				ref={ref}
				className={`sticky top-0 h-screen w-full ${
					scrollProgressScale >= 1 ? 'bg-black' : ''
				}`}
			>
				<motion.div
					style={{ scale }}
					variants={animateImage}
					initial="initial"
					animate={scrollProgress > 0 ? 'animate' : 'initial'}
					className={`h-full w-full rounded-site ${
						scrollProgressScale >= 1 ? '' : 'overflow-hidden'
					}`}
				>
					{data.imageTextPairs.map((imageTextPair, index) => (
						<Image
							key={index}
							src={imageTextPair.image.asset.url}
							alt={imageTextPair.image.alt}
							fill
							sizes="(max-width: 640px) 150vw, 100vw"
							style={{ objectFit: 'cover' }}
							placeholder="blur"
							blurDataURL={
								imageTextPair.image.asset.metadata.lqip
							}
							className={`relative transition duration-[1200ms] ${
								imageZs[index]
							} ${textScrolls[index] >= 1 ? 'opacity-0' : 'opacity-100'}`}
						/>
					))}
				</motion.div>
			</div>
			{data.imageTextPairs.map((imageTextPair, index) => (
				<div
					key={index}
					ref={textRefs[index]}
					className={`contained relative z-50 grid grid-cols-12 transition duration-700 min-[990px]:justify-items-end ${
						textScrolls[index] >= 1 ? 'opacity-0' : 'opacity-100'
					} ${index < fadeExplainerNumber - 1 ? 'h-[100vh]' : 'h-[70vh]'}`}
				>
					<div className="absolute z-50 col-span-12 col-start-1 text-offwhite sm:col-span-9 sm:col-start-1 min-[990px]:col-span-7 min-[990px]:col-start-6 min-[990px]:max-w-[700px]">
						<Text as="h2" textStyle="h2" className="mb-2 italic">
							{breakText(imageTextPair.heading)}
						</Text>
						<Text as="p" textStyle="body">
							{imageTextPair.body}
						</Text>
					</div>
				</div>
			))}
			<div className="h-[20vh]"></div>
		</section>
	);
}

const animateImage = {
	initial: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'linear',
		},
	},
	animate: {
		opacity: 0.7,
		transition: {
			duration: 0.2,
			ease: 'linear',
		},
	},
};

const removeImage = {
	initial: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'linear',
		},
	},
	animate: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};
