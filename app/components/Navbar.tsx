// import { getPages } from '@/sanity/sanity-utils';
'use client';
import { cn } from '@/lib/utils';
import { MouseEventHandler, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sanitiseSlug } from '../utils/slugFunctions';
import { CustomLink } from './CustomLink';
import { Text } from './atoms/Text';

import { Button } from './../ui/Button';
import ButtonBlock from './blocks/ButtonBlock';
import ButtonInnerAnimation from './atoms/ButtonInnerAnimation';

import { AnimateChangeInHeight } from './atoms/AnimateChangeInHeight';

// Prop imports
import { SiteInfoProps } from '@/types/SiteInfo';
import { MenuItem } from '@/types/SiteInfo';

// Animations
import { motion, cubicBezier, AnimatePresence } from 'framer-motion';
import { ButtonType } from '@/types/Button';

export default function Navbar({ data }: SiteInfoProps) {
	const [open, setOpen] = useState(false);

	function handleTray() {
		setOpen(!open);
	}
	function closeTray() {
		setOpen(false);
	}

	// useEffect(() => {
	// 	if (open) {
	// 		document.body.style.overflowY = 'hidden';
	// 	} else {
	// 		document.body.style.overflowY = 'unset';
	// 	}
	// });

	const hamburgerLine = `h-[3px] w-[24px] bg-black transition ease transform duration-[400ms]`;

	const path = usePathname();

	// Hide navbar on scroll - show on scroll up
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (path !== '/' && window.scrollY > lastScrollY && lastScrollY > 50) {
			// if scroll down hide the navbar
			setShow(false);
		} else if (
			path == '/' &&
			window.scrollY > lastScrollY &&
			lastScrollY > 400
		) {
			setShow(false);
		} else {
			// if scroll up show the navbar
			setShow(true);
		}

		// remember current page location to use in the next move
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);

		// cleanup function
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	// useEffect(() => {
	// 	if (path == '/') {
	// 		setTimeout(() => {
	// 			setShowHomeModal(true);
	// 		}, 2000);
	// 	} else {
	// 		setShowHomeModal(false);
	// 	}
	// }, [path]);

	return (
		<>
			<header
				className={cn(
					'sticky left-0 right-0 top-0 w-full transition-all delay-300 duration-500',
					{
						'-z-50 opacity-0': !show,
						'z-[550] bg-background opacity-100': show,
						'bg-transparent transition-colors delay-0 duration-0':
							open,
					},
				)}
			>
				<motion.div
					initial="initial"
					animate="animate"
					variants={navContainerAnimation}
					className="contained flex h-max items-center justify-between py-5 text-text"
				>
					<motion.div
						variants={navIconAnimation}
						initial="initial"
						animate="animate"
						className={cn('flex h-max items-center')}
					>
						<CustomLink
							href="/"
							aria-label="Back to homepage"
							className={cn('relative transition duration-300', {
								'text-white': open,
							})}
						>
							{data?.siteLogo?.textAsLogo ? (
								<span className="text-nav">
									{data.siteLogo?.textLogo}
								</span>
							) : data?.siteLogo?.imageLogo?.asset?.url ? (
								<div className="relative w-[112px] sm:w-full">
									<Image
										src={data.siteLogo.imageLogo?.asset.url}
										alt={
											data.siteLogo.imageLogo?.alt
												? data.siteLogo.imageLogo?.alt
												: 'Logo'
										}
										width={
											data.siteLogo.imageLogo?.asset
												.metadata?.dimensions?.width ??
											50
										}
										height={
											data.siteLogo.imageLogo?.asset
												.metadata?.dimensions?.height ??
											50
										}
										priority={true}
									/>
								</div>
							) : (
								''
							)}
						</CustomLink>
					</motion.div>
					<div className="hidden  flex-shrink-0 lg:block">
						<ButtonBlock
							className="gap-5 md:gap-10"
							data={{
								_key: 'sldkfj',
								_type: 'buttons',
								buttons: data.navMenu,
							}}
						/>
					</div>
					<button
						aria-label="Menu"
						onClick={handleTray}
						className="right-0 cursor-pointer space-y-[8px] text-white lg:hidden"
					>
						<div
							className={`${hamburgerLine} ${
								open
									? 'sm:bg-port translate-y-[5.25px] rotate-45 bg-white'
									: 'bg-black'
							}`}
						></div>
						<div
							className={`${hamburgerLine} ${
								open
									? 'sm:bg-port -translate-y-[5.25px] -rotate-45 bg-white'
									: 'bg-black'
							}`}
						></div>
					</button>
				</motion.div>
			</header>
			{/* <div className="w-full h-[120px]"></div> */}
			<MobileMenu
				closeTray={closeTray}
				open={open}
				buttons={data.navMenu}
			/>
		</>
	);
}

function MobileMenu({
	closeTray,
	open,
	buttons,
}: {
	closeTray: MouseEventHandler<HTMLElement>;

	open: boolean;
	buttons: ButtonType[];
}) {
	const hamburgerLine = `h-[3px] w-[24px] bg-white transition ease transform duration-[400ms]`;

	return (
		<>
			<div
				onClick={closeTray}
				className={`bg-wafer/50 fixed bottom-0 top-0 z-20 h-screen w-full overflow-hidden opacity-0 backdrop-blur-[3px] transition-all duration-[400ms] ${
					open ? 'opacity-100' : 'z-[-1]'
				}`}
			></div>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ ease: 'easeInOut', duration: 0.5 }}
						className={`mobile-menu-wrap fixed bottom-0 top-0 z-[500] ml-auto flex h-dvh w-full flex-col space-y-3 bg-primary px-5 pb-12 pt-36 lg:hidden`}
					>
						<ButtonBlock
							className="h-full flex-col items-end gap-8 text-white sm:px-16 "
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

// Animations
const navIconAnimation = {
	initial: {
		y: -20,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			duration: 1.5,
			// ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
		},
	},
};

const navContainerAnimation = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'afterChildren',
			// duration: 0.15,
			// staggerChildren: 0.05,
		},
	},
};

const navItemAnimation = {
	initial: {
		y: -20,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			duration: 1.5,
			// ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
		},
	},
};
