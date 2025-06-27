'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { useAtomValue } from 'jotai';

import { pageTransitionAtom } from '@/app/Atoms';

export default function PageTransition() {
	const pageTransition = useAtomValue(pageTransitionAtom);

	return (
		<motion.div
			variants={animation}
			initial="initial"
			animate={pageTransition.state ? 'animate' : 'exit'}
			className={cn(
				'bg-boozyZinfandel-p3 pointer-events-none fixed inset-0 z-2000 h-full w-full',
				pageTransition.color,
			)}
		></motion.div>
	);
}

const animation = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.7,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			delay: 0.2,
			ease: 'easeInOut',
			duration: 0.7,
		},
	},
};
