'use client';
import Image from 'next/image';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import { ImageType } from '@/types/Image';

type PageIntroProps = {
	data: {
		_key: string;
		_type: string;
		title: string;
		heading: string;
		subheading: string;
		image: ImageType;
	};
};

export default function PageIntro({ data }: PageIntroProps) {
	return (
		<section className="contained my-28 flex justify-center overflow-visible">
			<motion.div
				variants={animateContainer}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true, amount: 0.6 }}
				className="flex max-w-[400px] flex-col items-center text-center sm:max-w-[750px] lg:max-w-[940px]"
			>
				{data.image?.asset?.url ? (
					<motion.div
						variants={animateFadeUp}
						className="h-64 w-52 relative mb-5 origin-bottom overflow-hidden rounded-site"
					>
						<Image
							src={data.image.asset.url}
							width={
								data.image.asset.metadata.dimensions?.width ??
								145
							}
							height={
								data.image.asset.metadata.dimensions?.height ??
								200
							}
							alt={data.image.alt}
							sizes='"(max-width: 768px) 25vw, 20vw"'
							className="mb-5 w-full md:mb-10"
						/>
					</motion.div>
				) : (
					''
				)}
				<motion.h2 variants={animateFadeUp} className="text-h1 mb-5">
					{data.heading}
				</motion.h2>
				<motion.h3
					variants={animateFadeUp}
					className="text-h2 text-pretty font-normal"
				>
					{data.subheading}
				</motion.h3>
			</motion.div>
		</section>
	);
}

const animateContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.2,
		},
	},
};

// const animateRacket = {
// 	initial: {
// 		x: -100,
// 		opacity: 0,
// 		rotate: -30,
// 		scale: 0.2,
// 	},
// 	animate: {
// 		x: [-100, 10, 0],
// 		opacity: [0, 1, 1],
// 		rotate: [-30, 25, 0],
// 		scale: [0.2, 1.1, 1],
// 		transition: {
// 			duration: 1.2,
// 			// type: 'spring',
// 			// bounce: 0.4,
// 			ease: 'anticipate',
// 		},
// 	},
// };

const animateFadeUp = {
	initial: {
		y: 20,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1.2,
			ease: 'easeOut',
		},
	},
};

const animateChild = {
	initial: {
		y: 10,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1.2,
			ease: 'easeInOut',
			// ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
		},
	},
};
