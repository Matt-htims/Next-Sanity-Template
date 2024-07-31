'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SiteInfoProps } from '@/types/SiteInfo';

import twitter from '@/public/icon-x.svg';
import facebook from '@/public/icon-facebook.svg';
import instagram from '@/public/icon-instagram.svg';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Text } from './atoms/Text';

export default function Footer({ data }: SiteInfoProps) {
	return (
		<footer className="bg-offColor pb-5 pt-12">
			<div className="contained">
				<div className="mb-12 flex flex-col items-center space-y-5">
					<Link
						href="/"
						aria-label="Back to homepage"
						className="relative"
					>
						{data?.siteLogo?.textAsLogo ? (
							<Text as="span" textStyle="h3">
								{data.siteLogo?.textLogo}
							</Text>
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
										data.siteLogo.imageLogo?.asset.metadata
											?.dimensions?.width ?? 50
									}
									height={
										data.siteLogo.imageLogo?.asset.metadata
											?.dimensions?.height ?? 50
									}
								/>
							</div>
						) : (
							''
						)}
					</Link>
				</div>
				<p className="text-center text-base text-white/50">
					Copyright © {new Date().getFullYear()}{' '}
					{data.siteName ? data.siteName : ''}
				</p>
			</div>
		</footer>
	);
}
