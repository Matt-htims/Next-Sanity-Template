'use client';
import { useEffect, useState, HTMLAttributes } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { useAtom, useAtomValue } from 'jotai';

import {
	firstPageLoadAtom,
	startPageTransitionAtom,
	newHrefAtom,
} from '../Atoms';

const PageWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
	const path = usePathname();
	const [showPage, setShowPage] = useState(true);

	const [showTransitionPanel, setShowTransitionPanel] = useState(true);

	const firstPageLoad = useAtomValue(firstPageLoadAtom);

	const [startPageTransition, setStartPageTransition] = useAtom(
		startPageTransitionAtom,
	);

	const newHref = useAtomValue(newHrefAtom);

	useEffect(() => {
		setShowTransitionPanel(false);
	}, []);

	useEffect(() => {
		if (firstPageLoad && startPageTransition) {
			if (path == newHref) {
				setShowPage(false);
				setShowTransitionPanel(true);
			} else {
				setShowTransitionPanel(true);
			}

			setTimeout(
				() => {
					if (path == newHref) {
						setShowTransitionPanel(false);
						setStartPageTransition(false);
						setShowPage(true);
					}
				},
				path == newHref ? 300 : 5000,
			);
		}
	}, [startPageTransition, path, newHref]);

	return (
		<div className="">
			<AnimatePresence>
				{showTransitionPanel && firstPageLoad && (
					<motion.div
						initial={
							path == newHref ? { opacity: 1 } : { opacity: 0 }
						}
						animate={{
							opacity: 1,
							transition: { ease: 'easeInOut', duration: 0.6 },
						}}
						exit={
							path == newHref
								? {
										opacity: 0,
										transition: {
											ease: 'easeInOut',
											duration: 0.6,
										},
									}
								: { opacity: 1 }
						}
						className={cn('fixed inset-0 z-500000 bg-white')}
					></motion.div>
				)}
			</AnimatePresence>
			{showPage && <div {...props} />}
		</div>
	);
};

export default PageWrapper;
