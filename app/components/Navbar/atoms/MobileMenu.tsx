import { ButtonType } from '@/types/Button';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { MouseEventHandler, useState, useEffect } from 'react';
import ButtonBlock from '../../blocks/ButtonBlock';

export default function MobileMenu({
	closeTray,
	open,
	buttons,
}: {
	closeTray: MouseEventHandler<HTMLElement>;

	open: boolean;
	buttons: ButtonType[];
}) {
	const hamburgerLine = `h-[3px] w-[24px] bg-white transition ease transform duration-400`;

	return (
		<>
			{/* <div
				onClick={closeTray}
				className={`bg-wafer/50 fixed top-0 bottom-0 z-20 h-screen w-full overflow-hidden opacity-0 backdrop-blur-[3px] transition-all duration-400 ${
					open ? 'opacity-100' : 'z-[-1]'
				}`}
			></div> */}
			<AnimatePresence>
				{open && (
					<motion.div
						variants={mobileMenuContainer}
						initial="initial"
						animate="animate"
						exit="exit"
						className={`mobile-menu-wrap fixed top-0 bottom-0 z-500 ml-auto flex h-dvh w-full flex-col space-y-3 bg-primary px-5 pt-36 pb-12 lg:hidden`}
					>
						<ButtonBlock
							className="h-full flex-col items-end gap-8 text-white sm:px-16"
							data={{
								_key: 'sldkfj',
								_type: 'buttons',
								buttons: buttons,
								onClick: closeTray,
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

const mobileMenuContainer = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			ease: cubicBezier(0.33, 1, 0.68, 1),
			duration: 0.4, //0.8
			// when: 'beforeChildren',
			staggerChildren: 0.08,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			ease: 'easeInOut',
			delay: 0.5, //0.5
			duration: 0.4, //0.8
		},
	},
};
