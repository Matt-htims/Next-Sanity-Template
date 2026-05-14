'use client';
import Image from 'next/image';
import { ImageType } from '@/types/Image';
import { motion } from 'framer-motion';
import { animateChildFadeIn, animateContainer } from '@/lib/animations';
import { Container } from '../atoms/Container';
import Marquee from 'react-fast-marquee';

type LogoGridProps = {
	data: {
		style?: 'grid' | 'carousel';
		logos: ImageType[];
	};
};

function LogoItem({ logo }: { logo: ImageType }) {
	return (
		<Image
			src={logo.asset.url}
			width={logo.asset.metadata.dimensions?.width ?? 120}
			height={logo.asset.metadata.dimensions?.height ?? 50}
			alt={logo.alt}
			className="max-h-20"
			sizes="10vw"
		/>
	);
}

export default function LogoGrid({ data }: LogoGridProps) {
	const style = data.style ?? 'grid';

	if (style === 'carousel') {
		return (
			<section className="opacity-20">
				<Marquee speed={60} autoFill>
					<div className="flex items-center gap-20 pr-20 md:gap-40 md:pr-40">
						{data.logos.map((logo, index) => (
							<LogoItem logo={logo} key={index} />
						))}
					</div>
				</Marquee>
			</section>
		);
	}

	return (
		<Container as="section" className="opacity-20">
			<motion.div
				variants={animateContainer}
				initial="initial"
				whileInView="animate"
				className="flex items-center justify-center gap-2 xs:gap-7 sm:gap-12 sm:px-0 md:gap-14 lg:gap-24"
			>
				{data.logos.map((logo, index) => (
					<motion.div
						className="flex justify-center sm:w-max"
						variants={animateChildFadeIn}
						key={index}
					>
						<LogoItem logo={logo} />
					</motion.div>
				))}
			</motion.div>
		</Container>
	);
}
