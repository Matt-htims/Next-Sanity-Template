// import { getPages } from '@/sanity/sanity-utils';
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sanitiseSlug } from '../utils/slugFunctions';
import Button from './atoms/Button';

// Prop imports
import { SiteInfoProps } from '@/types/SiteInfo';
import { MenuItem } from '@/types/SiteInfo';

// Animations
import { motion, cubicBezier } from 'framer-motion';

type NavLinkProps = {
	menuItem: MenuItem;
	mobileMenu?: boolean;
	onClickFunction?: any;
};

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

function NavLink({ menuItem, mobileMenu, onClickFunction }: NavLinkProps) {
	const path = usePathname();

	return (
		<motion.li className="list-none" variants={navItemAnimation}>
			{menuItem.customLink ? (
				<Button
					button={{
						_type: 'button',
						url: menuItem?.link ?? '#',
						newTab: true,
						buttonText: menuItem?.displayName ?? '',
						buttonType: 'primary',
						buttonAnimation: 'button-text-reveal',
					}}
				/>
			) : mobileMenu ? (
				<Link
					href={`/${sanitiseSlug(menuItem.page?.slug ?? '')}`}
					className="text-nav-mobile"
					onClick={onClickFunction}
				>
					{menuItem.page?.name}
				</Link>
			) : (
				<Link
					href={`/${sanitiseSlug(menuItem.page?.slug ?? '')}`}
					className={`${
						mobileMenu
							? 'text-nav-mobile'
							: 'text-nav text-underline'
					} ${path === '/' + menuItem.page?.slug && 'decoration-current after:scale-x-100'}`}
				>
					{menuItem.page?.name}
				</Link>
			)}
		</motion.li>
	);
}

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

	const hamburgerLine = `h-[2.5px] w-[24px] bg-black transition ease transform duration-[400ms]`;

	return (
		<>
			<header className="w-full bg-offColor">
				<motion.div
					initial="initial"
					animate="animate"
					variants={navContainerAnimation}
					className="contained z-40 flex items-center justify-between py-5"
				>
					<motion.div
						variants={navIconAnimation}
						initial="initial"
						animate="animate"
						className="flex-initial"
					>
						<Link
							href="/"
							aria-label="Back to homepage"
							className="relative"
						>
							{data?.siteLogo?.textAsLogo ? (
								<span className="text-nav">
									{data.siteLogo?.textLogo}
								</span>
							) : data?.siteLogo?.imageLogo?.asset?.url ? (
								<div className="relative w-full">
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
						</Link>
					</motion.div>
					<div className="hidden  flex-shrink-0 lg:block">
						<ul className="flex space-x-10">
							{data?.navMenu?.map((menuItem, index: number) => (
								<NavLink key={index} menuItem={menuItem} />
							))}
						</ul>
					</div>
					<button
						aria-label="Menu"
						onClick={handleTray}
						className="right-0 cursor-pointer space-y-[8px] text-white lg:hidden"
					>
						<div
							className={`${hamburgerLine} ${
								open
									? 'bg-editorial-2 translate-y-[5.25px] rotate-45'
									: 'bg-black'
							}`}
						></div>
						<div
							className={`${hamburgerLine} ${
								open
									? 'bg-editorial-2 -translate-y-[5.25px] -rotate-45'
									: 'bg-black'
							}`}
						></div>
					</button>
				</motion.div>
			</header>
			<div
				onClick={closeTray}
				className={`fixed bottom-0 top-0 z-20 h-screen w-full overflow-hidden bg-black/20 opacity-0 backdrop-blur-[1px] transition-all duration-[400ms] ${
					open ? 'opacity-100' : 'z-[-1]'
				}`}
			></div>
			<div
				className={`fixed bottom-0 top-0 z-30 ml-auto flex w-9/12 flex-col items-center justify-center space-y-3 bg-black transition-all duration-[400ms] lg:hidden ${
					open ? 'left-0' : 'left-[-100%]'
				}`}
			>
				<Link href="/" onClick={handleTray} className="text-nav-mobile">
					Home
				</Link>
				{data?.navMenu?.map((menuItem, index: number) => (
					<NavLink
						key={index}
						menuItem={menuItem}
						mobileMenu={true}
						onClickFunction={handleTray}
					/>
				))}
			</div>
		</>
	);
}

// Previous mobile menu
