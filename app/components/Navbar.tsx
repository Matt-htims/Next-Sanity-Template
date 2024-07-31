// import { getPages } from '@/sanity/sanity-utils';
'use client';
import { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { sanitiseSlug } from '../utils/slugFunctions';
import { CustomLink } from './CustomLink';

import ButtonBlock from './blocks/ButtonBlock';

// Prop imports
import { SiteInfoProps } from '@/types/SiteInfo';
import { MenuItem } from '@/types/SiteInfo';

// Animations
import { motion, cubicBezier } from 'framer-motion';
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

	const hamburgerLine = `h-[2.5px] w-[24px] bg-black transition ease transform duration-[400ms]`;

	return (
		<>
			<header className="relative z-[9999] w-full bg-offColor">
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
						<CustomLink
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
	closeTray: MouseEventHandler<HTMLDivElement>;
	open: boolean;
	buttons: ButtonType[];
}) {
	return (
		<>
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
				{/* {data?.navMenu?.map((menuItem, index: number) => (
					<NavLink
						key={index}
						menuItem={menuItem}
						mobileMenu={true}
						onClickFunction={handleTray}
					/>
				))} */}
				<ButtonBlock
					className="flex-col gap-8 text-white md:gap-8"
					data={{
						_key: 'sldkfj',
						_type: 'buttons',
						buttons: buttons,
					}}
				/>
			</div>
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
