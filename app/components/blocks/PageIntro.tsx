'use client';
import {
	motion,
	useScroll,
	useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { navHeightAtom } from '@/app/Atoms';
import { useNavDark } from '@/lib/useNavDark';

import { ImageType } from '@/types/Image';
import { MotionText } from '../atoms/MotionText';
import { Text } from '../atoms/Text';
import { cn } from '@/lib/utils';
import { breakText } from '@/lib/breakText';
import CustomImage from '../atoms/CustomImage';

const animateContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.25,
		},
	},
};

export const animatePreheading = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut' as const,
			duration: 0.8,
		},
	},
};

const animateHeading = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut' as const,
			duration: 1.6,
			delay: 0.4,
		},
	},
};

const animateSubheading = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut' as const,
			duration: 1.6,
			delay: 0.6,
		},
	},
};

type PageIntroProps = {
	data: {
		_key: string;
		_type: string;
		title: string;
		style?: 'standard' | 'simple';
		preheading: string;
		heading: string;
		subheading: string;
		image: ImageType;
	};
};

export default function PageIntro({ data }: PageIntroProps) {
	const isSimple = data.style === 'simple';
	const sectionRef = useRef<HTMLElement>(null);
	const containerRef = useRef(null);
	const bannerHeight = useAtomValue(navHeightAtom);

	useNavDark(sectionRef, !isSimple && !!data.image?.asset?.url);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const SCALE_VALUE = 1;

	const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

	return (
		<section ref={sectionRef}>
			<div
				ref={containerRef}
				style={{ marginTop: `-${bannerHeight}px` }}
				className={cn(
					'relative flex w-screen flex-col items-center overflow-hidden',
					isSimple
						? 'pt-26'
						: 'h-screen pt-28 pb-20',
				)}
			>
				{!isSimple && data.image?.asset?.url ? (
					<motion.div
						initial={{ scale: 1.2, opacity: 0 }}
						animate={{ scale: SCALE_VALUE, opacity: 1 }}
						transition={{
							duration: 2,
							ease: 'easeInOut',
						}}
						className="absolute inset-0 bg-black"
					>
						<motion.div
							style={{ y }}
							className="h-full w-full opacity-64"
						>
							<CustomImage
								image={data.image}
								sizes="(max-width: 768px) 150vw, 100vw"
								className="h-full w-full object-cover object-center"
							/>
						</motion.div>
					</motion.div>
				) : null}

				<motion.div
					variants={animateContainer}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.6 }}
					className={cn(
						'contained relative flex h-full justify-center flex-col items-center gap-3 text-center md:gap-5',
						!isSimple && 'text-text-inverse',
					)}
				>
					{data.preheading && (
						<motion.div
							variants={animatePreheading}
							className="flex items-center justify-center gap-3"
						>

							<Text
								as="p"
								textStyle="nav"
								className="text-[20px] leading-6 text-pretty"
							>
								{data.preheading}
							</Text>
						</motion.div>
					)}

					<MotionText
						as="h2"
						textStyle="h1"
						className="mx-auto max-w-193 text-pretty"
						variants={animateHeading}
					>
						{breakText(data.heading)}
					</MotionText>

					{data.subheading && (
						<MotionText
							as="p"
							textStyle="body"
							className="mx-auto mt-4 max-w-193 text-pretty"
							variants={animateSubheading}
						>
							{data.subheading}
						</MotionText>
					)}
				</motion.div>
			</div>
		</section>
	);
}
