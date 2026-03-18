'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Components
import { CustomLink } from '../CustomLink';
import ButtonBlock from '../blocks/ButtonBlock';

// Prop imports
import { SiteInfoProps } from '@/types/SiteInfo';

// Animations
import { motion } from 'framer-motion';
import Banner from './Banner';

// Global State
import { useAtom } from 'jotai';
import { mobileMenuOpenAtom } from '@/app/Atoms';
import MobileMenu from './atoms/MobileMenu';
import { Text } from '../atoms/Text';
import { Container } from '../atoms/Container';

export default function Navbar({ data }: SiteInfoProps) {
	const path = usePathname();

	const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);

	function handleTray() {
		setMobileMenuOpen(!mobileMenuOpen);
	}
	function closeTray() {
		setMobileMenuOpen(false);
	}

	const hamburgerLine = `h-[3px] w-[24px] bg-text-primary transition ease transform duration-500 delay-300`;

	// Hide navbar on scroll - show on scroll up
	const [show, setShow] = useState(true);
	const [isNearTop, setIsNearTop] = useState(true);
	const showRef = useRef(true);
	const isNearTopRef = useRef(true);
	const lastScrollYRef = useRef(0);

	useEffect(() => {
		const controlNavbar = () => {
			const currentScrollY = window.scrollY;
			const shouldHide =
				currentScrollY > lastScrollYRef.current && currentScrollY > 100;
			const nextShow = !shouldHide;
			const nextIsNearTop = currentScrollY < 80;

			if (showRef.current !== nextShow) {
				showRef.current = nextShow;
				setShow(nextShow);
			}

			if (isNearTopRef.current !== nextIsNearTop) {
				isNearTopRef.current = nextIsNearTop;
				setIsNearTop(nextIsNearTop);
			}

			lastScrollYRef.current = currentScrollY;
		};

		window.addEventListener('scroll', controlNavbar, { passive: true });
		controlNavbar();

		// cleanup function
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, []);

	useEffect(() => {
		if (document.documentElement.dataset.theme == 'light') {
		} else {
			document.documentElement.dataset.theme = 'light';
		}
	}, [path]);

	return (
		<>
			<Banner data={data} isNearTop={isNearTop} />
			<header
				className={cn(
					'sticky top-0 right-0 left-0 w-full transition-all duration-500',
					{
						'-z-50 opacity-0': !show,
						'z-200 bg-bg-canvas opacity-100': show,
					},
				)}
			>
				<div
					className={cn(
						'relative z-550 h-max w-full transition-all duration-500',
						{
							'-z-50 opacity-0': !show,
							'z-550 opacity-100': show,
							'bg-transparent transition-colors delay-0 duration-0':
								mobileMenuOpen,
						},
					)}
				>
					<Container>
						<motion.div
							initial="initial"
							animate="animate"
							variants={navContainerAnimation}
							className="flex h-max items-center justify-between py-5 text-text-primary"
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
											'text-text-inverse delay-0':
												mobileMenuOpen,
										},
									)}
								>
									{data?.siteLogo?.textAsLogo ? (
										<Text as="span" textStyle="h6">
											{data.siteLogo?.textLogo}
										</Text>
									) : data?.siteLogo?.imageLogo?.asset
											?.url ? (
										<div className="relative w-28 sm:w-full">
											<Image
												src={
													data.siteLogo.imageLogo
														?.asset.url
												}
												alt={
													data.siteLogo.imageLogo?.alt
														? data.siteLogo
																.imageLogo?.alt
														: 'Logo'
												}
												width={
													data.siteLogo.imageLogo
														?.asset.metadata
														?.dimensions?.width ??
													50
												}
												height={
													data.siteLogo.imageLogo
														?.asset.metadata
														?.dimensions?.height ??
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
								className="right-0 cursor-pointer space-y-2 text-text-inverse lg:hidden"
							>
								<div
									className={cn(
										hamburgerLine,
										mobileMenuOpen
											? 'translate-y-[5.25px] rotate-45 bg-text-inverse delay-0'
											: 'bg-text-primary',
									)}
								></div>
								<div
									className={cn(
										hamburgerLine,
										mobileMenuOpen
											? '-translate-y-[5.25px] -rotate-45 bg-text-inverse delay-0'
											: 'bg-text-primary',
									)}
								></div>
							</button>
						</motion.div>
					</Container>
				</div>
				<div
					className={cn(
						'absolute inset-0 h-full w-full bg-bg-canvas transition-all duration-500',
						{
							'-z-50 opacity-0': !show,
							'z-200 opacity-100': show,
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
			type: 'spring' as const,
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
