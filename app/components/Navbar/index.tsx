'use client';
import { cn } from '@/lib/utils';
import { MouseEventHandler, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Components
import { CustomLink } from '../CustomLink';
import ButtonBlock from '../blocks/ButtonBlock';

// Prop imports
import { SiteInfoProps } from '@/types/SiteInfo';

// Animations
import { motion, AnimatePresence, cubicBezier, delay } from 'framer-motion';
import { ButtonType } from '@/types/Button';
import Banner from './atoms/Banner';

// Global State
import { useSetAtom, useAtom } from 'jotai';
import { mobileMenuOpenAtom } from '@/app/Atoms';
import MobileMenu from './atoms/MobileMenu';

export default function Navbar({ data }: SiteInfoProps) {
	const path = usePathname();

	const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);

	function handleTray() {
		setMobileMenuOpen(!mobileMenuOpen);
	}
	function closeTray() {
		setMobileMenuOpen(false);
	}

	const hamburgerLine = `h-[3px] w-[24px] bg-text transition ease transform duration-500 delay-300`;

	// Hide navbar on scroll - show on scroll up
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (path !== '/' && window.scrollY > lastScrollY && lastScrollY > 100) {
			// if scroll down hide the navbar
			setShow(false);
		} else if (
			path == '/' &&
			window.scrollY > lastScrollY &&
			lastScrollY > 100
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

	useEffect(() => {
		if (document.documentElement.dataset.theme == 'light') {
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}, [path]);

	return (
		<>
			<Banner data={data} lastScrollY={lastScrollY} />
			<header
				className={cn(
					'sticky top-0 right-0 left-0 w-full transition-all duration-500',
					{
						'-z-50 opacity-0': !show,
						'z-200 bg-background opacity-100': show,
					},
				)}
			>
				<div
					className={cn(
						'relative z-[550] h-max w-full transition-all duration-500',
						{
							'-z-50 opacity-0': !show,
							'z-550 opacity-100': show,
							'bg-transparent transition-colors delay-0 duration-0':
								mobileMenuOpen,
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
							onClick={() => setMobileMenuOpen(false)}
							variants={navIconAnimation}
							initial="initial"
							animate="animate"
							className={cn('flex h-max items-center')}
						>
							<CustomLink
								href="/"
								aria-label="Back to homepage"
								className={cn(
									'relative transition delay-300 duration-300',
									{
										'text-white delay-0': mobileMenuOpen,
									},
								)}
							>
								{data?.siteLogo?.textAsLogo ? (
									<span className="text-nav">
										{data.siteLogo?.textLogo}
									</span>
								) : data?.siteLogo?.imageLogo?.asset?.url ? (
									<div className="relative w-[112px] sm:w-full">
										<Image
											src={
												data.siteLogo.imageLogo?.asset
													.url
											}
											alt={
												data.siteLogo.imageLogo?.alt
													? data.siteLogo.imageLogo
															?.alt
													: 'Logo'
											}
											width={
												data.siteLogo.imageLogo?.asset
													.metadata?.dimensions
													?.width ?? 50
											}
											height={
												data.siteLogo.imageLogo?.asset
													.metadata?.dimensions
													?.height ?? 50
											}
											priority={true}
										/>
									</div>
								) : (
									''
								)}
							</CustomLink>
						</motion.div>
						<div className="hidden shrink-0 lg:block">
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
								className={cn(
									hamburgerLine,
									mobileMenuOpen
										? 'translate-y-[5.25px] rotate-45 bg-white delay-0'
										: 'bg-text',
								)}
							></div>
							<div
								className={cn(
									hamburgerLine,
									mobileMenuOpen
										? '-translate-y-[5.25px] -rotate-45 bg-white delay-0'
										: 'bg-text',
								)}
							></div>
						</button>
					</motion.div>
				</div>
				<div
					className={cn(
						'absolute inset-0 h-full w-full bg-background transition-all duration-500',
						{
							'-z-50 opacity-0': !show,
							'z-[200] opacity-100': show,
						},
					)}
				></div>
				<MobileMenu
					closeTray={closeTray}
					open={mobileMenuOpen}
					buttons={data.navMenu}
				/>
			</header>
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
