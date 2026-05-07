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
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { mobileMenuOpenAtom, navHeightAtom, navDarkAtom } from '@/app/Atoms';
import MobileMenu from './atoms/MobileMenu';
import { Text } from '../atoms/Text';
import { Container } from '../atoms/Container';

export default function Navbar({ data }: SiteInfoProps) {
	const path = usePathname();

	const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);
	const navDark = useAtomValue(navDarkAtom);
	const setNavHeight = useSetAtom(navHeightAtom);
	const bannerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const mobileMenuOpenRef = useRef(false);

	useEffect(() => {
		mobileMenuOpenRef.current = mobileMenuOpen;
	}, [mobileMenuOpen]);

	useEffect(() => {
		const update = () => {
			if (mobileMenuOpenRef.current) return;
			const bannerH = bannerRef.current?.offsetHeight ?? 0;
			const headerH = headerRef.current?.offsetHeight ?? 0;
			setNavHeight(bannerH + headerH);
		};
		const observer = new ResizeObserver(update);
		if (bannerRef.current) observer.observe(bannerRef.current);
		if (headerRef.current) observer.observe(headerRef.current);
		return () => observer.disconnect();
	}, [setNavHeight]);

	function handleTray() {
		setMobileMenuOpen(!mobileMenuOpen);
	}
	function closeTray() {
		setMobileMenuOpen(false);
	}

	const hamburgerLine = `h-[3px] w-[24px] transition-colors duration-500`;

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
			<div ref={bannerRef}>
				<Banner data={data} isNearTop={isNearTop} />
			</div>
			<header
				ref={headerRef}
				className={cn(
					'sticky top-0 right-0 left-0 w-full transition-all duration-500',
					{
						'-z-50 opacity-0': !show,
						'z-200 opacity-100': show,
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
							className={cn('flex h-max items-center justify-between py-5 transition-colors duration-300', navDark ? 'text-text-inverse' : 'text-text-primary')}
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
										'relative transition-colors duration-500',
										{
											'text-text-inverse': mobileMenuOpen || navDark,
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
								className="right-0 cursor-pointer space-y-2 lg:hidden"
							>
								<motion.div
									className={cn(hamburgerLine, navDark || mobileMenuOpen ? 'bg-text-inverse' : 'bg-text-primary')}
									animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 5.25 : 0 }}
									transition={{ duration: 0.5, delay: !mobileMenuOpen ? 0.3 : 0, ease: [0.45, 0, 0.55, 1] }}
								/>
								<motion.div
									className={cn(hamburgerLine, navDark || mobileMenuOpen ? 'bg-text-inverse' : 'bg-text-primary')}
									animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -5.25 : 0 }}
									transition={{ duration: 0.5, delay: !mobileMenuOpen ? 0.3 : 0, ease: [0.45, 0, 0.55, 1] }}
								/>
							</button>
						</motion.div>
					</Container>
				</div>
				{/* <div
					className={cn(
						'absolute inset-0 h-full w-full bg-bg-canvas transition-all duration-500',
						{
							'-z-50 opacity-0': !show,
							'z-200 opacity-100': show,
						},
					)}
				></div> */}
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
