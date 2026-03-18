'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SiteInfoProps } from '@/types/SiteInfo';

import twitter from '@/public/icon-x.svg';
import facebook from '@/public/icon-facebook.svg';
import instagram from '@/public/icon-instagram.svg';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Text } from './atoms/Text';
import { CustomLink } from './CustomLink';
import { Container } from './atoms/Container';

import { useSetAtom } from 'jotai';
import { firstPageLoadAtom } from '../Atoms';

export default function Footer({ data }: SiteInfoProps) {
	const setFirstPageLoad = useSetAtom(firstPageLoadAtom);

	useEffect(() => {
		setFirstPageLoad(true);
	}, [setFirstPageLoad]);
	return (
		<footer id="footer" className="bg-bg-muted pt-12 pb-5">
			<Container>
				<div className="mb-12 flex flex-col items-center space-y-5">
					<CustomLink
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
					</CustomLink>
				</div>
				<p className="text-center text-base text-text-primary/50">
					Copyright © {new Date().getFullYear()}{' '}
					{data.siteName ? data.siteName : ''}
				</p>
			</Container>
		</footer>
	);
}
