'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SiteInfoProps } from '@/types/SiteInfo';

import twitter from '@/public/icon-x.svg';
import facebook from '@/public/icon-facebook.svg';
import instagram from '@/public/icon-instagram.svg';

import { motion } from 'framer-motion';
import Image from 'next/image';

import Button from './atoms/Button';

export default function Footer({ data }: SiteInfoProps) {
	return (
		<footer className="pb-2 pt-5 bg-offColor">
			<div className="contained">
				<div className="flex flex-col items-center space-y-2 mb-5">
					<Link href="/" aria-label="Back to homepage" className="relative">
						{data?.siteLogo?.textAsLogo ? (
							<span className="text-nav text-2xl">
								{data.siteLogo?.textLogo}
							</span>
						) : data?.siteLogo?.imageLogo?.asset?.url ? (
							<div className="w-full relative">
								<Image
									src={data.siteLogo.imageLogo?.asset.url}
									alt={
										data.siteLogo.imageLogo?.alt
											? data.siteLogo.imageLogo?.alt
											: 'Logo'
									}
									width={
										data.siteLogo.imageLogo?.asset.metadata?.dimensions
											?.width ?? 50
									}
									height={
										data.siteLogo.imageLogo?.asset.metadata?.dimensions
											?.height ?? 50
									}
								/>
							</div>
						) : (
							''
						)}
					</Link>
					<div className="flex space-x-0.5">
						{data?.twitterLink && (
							<Link aria-label="Twitter" href={data.twitterLink}>
								<Image src={twitter} alt="Twitter" />
							</Link>
						)}
						{data?.facebookLink && (
							<Link aria-label="Facebook" href={data.facebookLink}>
								<Image src={facebook} alt="Facebook" />
							</Link>
						)}
						{data?.instaLink && (
							<Link aria-label="Instagram" href={data.instaLink}>
								<Image src={instagram} alt="Facebook" />
							</Link>
						)}
					</div>
				</div>
				<p className="text-center text-white/50 text-base">
					Copyright © {new Date().getFullYear()}{' '}
					{data.siteName ? data.siteName : ''}
				</p>
			</div>
		</footer>
	);
}
