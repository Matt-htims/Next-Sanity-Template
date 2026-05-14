'use client';
import { animateChildUp } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
	const containerRef = useRef(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isInView = useInView(containerRef, { once: false });

	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);

	const handleStartAndUnmute = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.muted = false;
			videoRef.current.play();
			setIsPlaying(true);
			setIsMuted(false);
		}
	};

	const handleVideoClick = () => {
		if (isPlaying && isMuted) {
			handleStartAndUnmute();
		} else if (!isPlaying) {
			if (videoRef.current) {
				videoRef.current.play();
				setIsPlaying(true);
			}
		} else {
			if (videoRef.current) {
				videoRef.current.pause();
				setIsPlaying(false);
			}
		}
	};

	useEffect(() => {
		if (!videoRef.current) return;
		if (isInView) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	}, [isInView]);

	return (
		<Container as="section" ref={containerRef}>
			<motion.div
				variants={animateChildUp}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				className="aspect-35/23 w-full overflow-hidden"
			>
				<CornerSmoothing className="h-full w-full">
					<div className="relative h-full w-full">
						<video
							onClick={handleVideoClick}
							ref={videoRef}
							onPlay={() => setIsPlaying(true)}
							onPause={() => setIsPlaying(false)}
							onVolumeChange={() => {
								if (videoRef.current) setIsMuted(videoRef.current.muted);
							}}
							className="relative z-30 h-full w-full cursor-pointer object-cover"
							playsInline
							autoPlay
							muted
							loop
							poster={data.videoThumbnail}
							src={data.videoSource}
						></video>
						<div className="pointer-events-none absolute inset-0 z-40 flex h-full w-full items-center justify-center">
							{isPlaying && !isMuted ? null : (
								<svg
									width="80"
									height="80"
									viewBox="0 0 80 80"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M26.7999 7.74197C22.3573 5.0348 16.6641 8.2325 16.6641 13.4349V66.5653C16.6641 71.768 22.3573 74.9657 26.7999 72.2583L70.3941 45.693C74.6574 43.095 74.6574 36.9053 70.3941 34.3073L26.7999 7.74197Z"
										fill="white"
									/>
								</svg>
							)}
						</div>
					</div>
				</CornerSmoothing>
			</motion.div>
		</Container>
	);
}
