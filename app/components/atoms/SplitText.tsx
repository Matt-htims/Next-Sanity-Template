'use client';

import { motion } from 'framer-motion';

export default function SplitText({
	text,
	animateOnce,
	animation,
	delay,
	staggerChildren,
}: {
	text: string;
	animateOnce?: boolean;
	animation?: 'typeIn' | 'fadeIn';
	delay?: number;
	staggerChildren?: number;
}) {
	const animateTitleContainer = {
		initial: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
				staggerChildren: staggerChildren ?? 0.08,
				staggerDirection: -1,
			},
		},
		animate: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				duration: delay,
				staggerChildren: staggerChildren ?? 0.02,
			},
		},
	};
	return (
		<div className="pl-1 sm:pl-2 md:pl-3">
			<span className="sr-only">{text}</span>
			<motion.span
				variants={animateTitleContainer}
				initial="initial"
				whileInView="animate"
				viewport={{ once: animateOnce }}
				aria-hidden
			>
				{text.split(' ').map((word, index) => (
					<span key={index} className="word inline-block">
						{word.split('').map((char, index) => (
							<motion.span
								variants={
									animation == 'typeIn'
										? typeIn
										: animation == 'fadeIn'
											? fadeIn
											: undefined
								}
								key={index}
								className="inline-block"
							>
								{char}
							</motion.span>
						))}
						<span className="inline-block">&nbsp;</span>
					</span>
				))}
			</motion.span>
		</div>
	);
}

const typeIn = {
	initial: {
		opacity: 0.2,
		transition: {
			ease: 'easeInOut',
			duration: 0.1,
		},
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.6,
		},
	},
};

const fadeIn = {
	initial: {
		x: 50,
		opacity: 0,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			ease: 'circOut',
			duration: 0.6,
			opacity: {
				ease: 'easeInOut',
				duration: 0.4,
			},
		},
	},
};
