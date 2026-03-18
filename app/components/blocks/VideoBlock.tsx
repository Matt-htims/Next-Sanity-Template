'use client';
import { animateChildUp } from '@/lib/animations';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import CornerSmoothing from '../atoms/CornerSmoothing';
import { Container } from '../atoms/Container';

type VideoBlockProps = {
	data: {
		_key: string;
		_type: string;
		videoThumbnail: string;
		videoSource: string;
	};
};

export default function VideoBlock({ data }: VideoBlockProps) {
	let desktopRef = useRef(null);

	return (
		<Container as="section" ref={desktopRef}>
			<motion.div
				variants={animateChildUp}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				className="aspect-35/23 w-full overflow-hidden"
			>
				<CornerSmoothing className="h-full w-full">
					<video
						className="relative z-30 h-full w-full object-cover"
						playsInline
						autoPlay
						muted
						loop
						poster={data.videoThumbnail}
						src={data.videoSource}
					></video>
				</CornerSmoothing>
			</motion.div>
		</Container>
	);
}
