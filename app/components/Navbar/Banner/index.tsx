'use client';

import { BannerItemType, SiteInfo } from '@/types/SiteInfo';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { AnimateChangeInHeight } from '../../atoms/AnimateChangeInHeight';
import { Text } from '../../atoms/Text';

import EmblaCarousel from './BannerEmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { cn } from '@/lib/utils';

import { useAtomValue } from 'jotai';
import { mobileMenuOpenAtom } from '@/app/Atoms';
import { CustomLink } from '../../CustomLink';
import { customEasing } from '@/lib/animations';

const OPTIONS: EmblaOptionsType = { axis: 'y', loop: true, watchDrag: false };

export default function Banner({
	data,
	isNearTop,
}: {
	data: SiteInfo;
	isNearTop: boolean;
}) {
	const [closeBanner, setCloseBanner] = useState(false);

	const mobileMenuOpen = useAtomValue(mobileMenuOpenAtom);
	const showBanner = !(mobileMenuOpen && isNearTop);

	return (
		<AnimateChangeInHeight>
			<AnimatePresence mode="popLayout">
				{data.addBanner &&
					data.banner &&
					showBanner &&
					!closeBanner && (
						<motion.div
							variants={bannerAnimation}
							initial="initial"
							animate="animate"
							exit="exit"
							className="relative z-50 text-black"
						>
							<EmblaCarousel options={OPTIONS}>
								{data.banner.map((bannerItem, index) => {
									if (
										bannerItem.bannerLink &&
										Array.from(bannerItem.bannerLink)[0] ==
											'/'
									) {
										return (
											<CustomLink
												key={index}
												href={bannerItem.bannerLink}
												className={cn(
													'bg-ice relative z-210 flex h-10 min-h-0 flex-[0_0_100%] items-center justify-center px-0 text-center md:h-15.5',
													{
														'bg-accent':
															bannerItem.bannerColour ==
															'primary',
														'bg-accent-alt':
															bannerItem.bannerColour ==
															'secondary',
													},
												)}
											>
												<BannerInner
													bannerItem={bannerItem}
													length={
														data?.banner?.length
													}
												/>
											</CustomLink>
										);
									} else {
										return (
											<a
												key={index}
												href={bannerItem.bannerLink}
												className={cn(
													'bg-ice relative z-210 flex h-10 min-h-0 flex-[0_0_100%] items-center justify-center px-0 text-center md:h-15.5',
													{
														'bg-accent':
															bannerItem.bannerColour ==
															'primary',
														'bg-accent-alt':
															bannerItem.bannerColour ==
															'secondary',
													},
												)}
											>
												<BannerInner
													bannerItem={bannerItem}
													length={
														data?.banner?.length
													}
												/>
											</a>
										);
									}
								})}
							</EmblaCarousel>
							<div
								onClick={() => setCloseBanner(true)}
								className="absolute top-0 right-2.5 z-10 flex h-full cursor-pointer items-center md:right-5"
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2.62487 1.56446L5.99987 4.93946L9.37487 1.56446L10.4355 2.62512L7.06052 6.0001L10.4355 9.3751L9.37487 10.4358L5.99987 7.06075L2.62487 10.4358L1.56421 9.3751L4.93921 6.0001L1.56421 2.62512L2.62487 1.56446Z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</motion.div>
					)}
			</AnimatePresence>
		</AnimateChangeInHeight>
	);
}

function BannerInner({
	bannerItem,
	length,
}: {
	bannerItem: BannerItemType;
	length?: number;
}) {
	return (
		<>
			<Text
				as="span"
				textStyle="body-small"
				className="hidden font-bold md:block"
			>
				{bannerItem.bannerContent}
			</Text>
			<div className="w-full md:hidden">
				<Marquee className="w-full" autoFill speed={40}>
					<Text
						as="span"
						textStyle="body-small"
						className="mr-8 font-bold"
					>
						{bannerItem.bannerContent}
					</Text>
				</Marquee>
			</div>
			{length && length > 1 && (
				<div
					className={cn(
						'absolute top-0 bottom-0 left-0 z-8 w-14 bg-linear-to-r from-accent from-40% to-accent/0',
						{
							'from-accent': bannerItem.bannerColour == 'primary',
							'from-accent-alt':
								bannerItem.bannerColour == 'secondary',
							'w-8': length && length < 2,
						},
					)}
				></div>
			)}
			<div
				className={cn(
					'absolute top-0 right-0 bottom-0 z-8 w-14 bg-linear-to-l from-accent from-40% to-accent/0',
					{
						'from-accent': bannerItem.bannerColour == 'primary',
						'from-accent-alt':
							bannerItem.bannerColour == 'secondary',
					},
				)}
			></div>
		</>
	);
}

const bannerAnimation = {
	initial: {
		y: -62,
		transition: {
			ease: customEasing,
			duration: 0.8,
			delay: 0.5,
			// ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
		},
	},
	animate: {
		y: 0,
		transition: {
			ease: customEasing,
			duration: 0.8,
			delay: 0.3,
			// ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
		},
	},
	exit: {
		opacity: 0,
		transition: {
			ease: 'easeInOut' as const,
			duration: 0.8,
		},
	},
};
