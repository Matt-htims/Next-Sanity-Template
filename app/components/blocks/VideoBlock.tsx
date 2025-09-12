'use client';
import { animateChildUp } from '@/app/animations';
import { cn } from '@/lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CornerSmoothing from '../atoms/CornerSmoothing';

type VideoBlockProps = {
	data: {
		_key: string;
		_type: string;
		videoThumbnail: string;
		videoSource: string;
	};
};

export default function VideoBlock({ data }: VideoBlockProps) {
	const { width } = useWindowSize();
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
	let borderRadiusMobile = useTransform(
		scrollYDesktop,
		[0.8, 1],
		['8px', '0px'],
	);
	// let scaleMobile = useTransform(scrollYMobile, [0, 1], ['70%', '105%']);
	return (
		<motion.section
			variants={animateChildUp}
			initial="initial"
			whileInView="animate"
			viewport={{ once: true }}
			ref={desktopRef}
			className={cn('contained', {})}
		>
			<motion.div
				// style={{
				// 	scale,
				// 	// borderRadius:
				// 	// 	width && width < 1024 ? borderRadiusMobile : '8px',
				// }}
				className={cn('aspect-[35/23] w-full overflow-hidden')}
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
		</motion.section>
	);
}
