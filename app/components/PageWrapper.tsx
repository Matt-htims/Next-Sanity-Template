'use client';
import { useEffect, useState, HTMLAttributes } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { useAtom } from 'jotai';

import { pageTransitionAtom } from '../Atoms';

const PageWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
	const path = usePathname();
	const [showPage, setShowPage] = useState(true);

	const [showTransitionPanel, setShowTransitionPanel] = useState(false);

	const [pageTransition, setPageTransition] = useAtom(pageTransitionAtom);

	useEffect(() => {
		if (
			pageTransition.firstPageLoad &&
			pageTransition.startPageTransition
		) {
			if (path == pageTransition.newHref) {
				setShowPage(false);
				setShowTransitionPanel(true);
			} else {
				setShowTransitionPanel(true);
			}

			setTimeout(
				() => {
					setShowPage(true);
					setShowTransitionPanel(false);
					setPageTransition((prev) => ({
						...prev,
						startPageTransition: false,
					}));
				},
				path == pageTransition.newHref ? 300 : 2000,
			);
		}
	}, [pageTransition, path]);

	return (
		<div className="" onClick={() => console.log(pageTransition)}>
			<AnimatePresence>
				{showTransitionPanel && pageTransition.firstPageLoad && (
					<motion.div
						initial={
							path == pageTransition.newHref
								? { opacity: 1 }
								: { opacity: 0 }
						}
						animate={{
							opacity: 1,
							transition: { ease: 'easeInOut', duration: 0.6 },
						}}
						exit={
							path == pageTransition.newHref
								? {
										opacity: 0,
										transition: {
											ease: 'easeInOut',
											duration: 0.6,
										},
									}
								: { opacity: 1 }
						}
						className={cn('fixed inset-0 z-2000 bg-white', {
							'bg-primary':
								pageTransition.newHref == '/style-guide',
						})}
					></motion.div>
				)}
			</AnimatePresence>
			{showPage && <div {...props} />}
		</div>
	);
};

export default PageWrapper;
