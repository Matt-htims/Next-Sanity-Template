'use client';
import { useRef, useState } from 'react';
import {
	motion,
	useInView,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion';
import { Text } from '../../atoms/Text';

export default function RevealOnScrollText({
	text,
	textStyle,
	className,
}: {
	text: string;
	className: any;
	textStyle:
		| 'body'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'body-small'
		| null
		| undefined;
}) {
	const textref = useRef(null);

	const [wordRevealState, setWordRevealState] = useState(0);

	const wordNo = text.split(' ').length ?? 0;

	const { scrollYProgress } = useScroll({
		target: textref,
		offset: ['start 0.9', 'end 0.5'],
	});

	let wordReveal: any = useTransform(
		scrollYProgress,
		[0, 1],
		[-10, wordNo + 10],
	);

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		// console.log(latest, wordReveal, wordNo);
		setWordRevealState(wordReveal.current);
	});
	return (
		<Text
			as="div"
			textStyle={textStyle}
			className={className}
			ref={textref}
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden>
				{text.split(' ').map((word, index) => (
					<motion.span
						variants={animateSimpleText}
						initial="initial"
						animate={wordRevealState > index ? 'animate' : ''}
						key={index}
						className="word inline-block"
					>
						{word.split('').map((char, index) => (
							<span key={index} className="inline-block">
								{char}
							</span>
						))}
						<span className="inline-block">&nbsp;</span>
					</motion.span>
				))}
			</span>
		</Text>
	);
}

const animateSimpleText = {
	initial: {
		opacity: 0.1,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};
