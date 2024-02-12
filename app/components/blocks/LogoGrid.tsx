'use client';
import Image from 'next/image';
import { ImageType } from '@/types/Image';
import { motion } from 'framer-motion';

type LogoGridProps = {
	data: {
		logos: ImageType[];
	};
};

export default function LogoGrid({ data }: LogoGridProps) {
	return (
		<section className="contained opacity-20">
			<motion.div
				variants={animateContainer}
				initial="initial"
				whileInView="animate"
				className="flex-wra xs:gap-3 flex items-center justify-center gap-2 sm:gap-5 sm:px-0 md:gap-6 lg:gap-10"
			>
				{data.logos.map((logo, index) => (
					<motion.div
						className="flex justify-center sm:w-max"
						variants={animateLogo}
						key={index}
					>
						<Image
							src={logo.asset.url}
							width={logo.asset.metadata.dimensions?.width ?? 120}
							height={
								logo.asset.metadata.dimensions?.height ?? 50
							}
							alt={logo.alt}
							sizes="10vw"
						/>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}

// Animations
const animateContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			duration: 0.1,
			staggerChildren: 0.12,
		},
	},
};

const animateLogo = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.5,
		},
	},
};
