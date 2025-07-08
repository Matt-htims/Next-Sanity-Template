'use client';
import Image from 'next/image';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import { ImageType } from '@/types/Image';
import { MotionText } from '../atoms/MotionText';
import { animateChildUp, animateContainer } from '@/app/animations';

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
						variants={animateChildUp}
						className="relative mb-5 h-64 w-52 origin-bottom overflow-hidden rounded-site"
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
				<MotionText
					as="h2"
					textStyle="h1"
					className="mb-5"
					variants={animateChildUp}
				>
					{data.heading}
				</MotionText>
				<MotionText
					as="h3"
					textStyle="h2"
					className="font-normal text-pretty"
					variants={animateChildUp}
				>
					{data.subheading}
				</MotionText>
			</motion.div>
		</section>
	);
}
