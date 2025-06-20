'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';

import { lenisScrollToAtom } from '@/app/Atoms';
import { CustomLink } from '../CustomLink';
import { LinkType } from '@/types/Link';
import ButtonInnerAnimation from './ButtonInnerAnimation';

const InnerLink = forwardRef<
	HTMLAnchorElement,
	{
		innerLinkData: LinkType;
		navLink?: boolean;
	} & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ innerLinkData, navLink, className, ...props }, ref) => {
	const setLenisScrollTo = useSetAtom(lenisScrollToAtom);

	const sharedProps = {
		className,
		ref,
		...props,
	};

	if (innerLinkData?.linkType == 'default') {
		return (
			<CustomLink href={'/' + innerLinkData.page?.slug} {...sharedProps}>
				{navLink ? (
					<>{innerLinkData.pageTitle ?? innerLinkData.page?.name}</>
				) : (
					<ButtonInnerAnimation>
						{innerLinkData.pageTitle ?? innerLinkData.page?.name}
					</ButtonInnerAnimation>
				)}
			</CustomLink>
		);
	}

	if (innerLinkData?.linkType == 'customLink') {
		const href = innerLinkData.externalLink ?? '#';
		if (href.startsWith('/')) {
			return (
				<CustomLink href={href} {...sharedProps}>
					{navLink ? (
						<>{innerLinkData.displayName}</>
					) : (
						<ButtonInnerAnimation>
							{innerLinkData.displayName}
						</ButtonInnerAnimation>
					)}
				</CustomLink>
			);
		}
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer nofollow"
				{...sharedProps}
			>
				{navLink ? (
					<>{innerLinkData.displayName}</>
				) : (
					<ButtonInnerAnimation>
						{innerLinkData.displayName}
					</ButtonInnerAnimation>
				)}
			</a>
		);
	}

	if (innerLinkData?.linkType == 'anchorLinkCurrentPage') {
		return (
			<Link
				href={'#' + innerLinkData.anchorLink}
				onClick={(e) => {
					props?.onClick?.(e);
					setLenisScrollTo({
						id: '#' + innerLinkData.anchorLink,
						offset: 100,
						duration: 2.5,
						easing: (x: any) =>
							x < 0.5
								? 4 * x * x * x
								: 1 - Math.pow(-2 * x + 2, 3) / 2,
					});
				}}
				{...sharedProps}
			>
				{navLink ? (
					<>{innerLinkData.displayName}</>
				) : (
					<ButtonInnerAnimation>
						{innerLinkData.displayName}
					</ButtonInnerAnimation>
				)}
			</Link>
		);
	}

	if (innerLinkData?.linkType == 'anchorLinkDifferentPage') {
		const href =
			'/' + innerLinkData.page?.slug + '#' + innerLinkData.anchorLink;
		return (
			<CustomLink href={href} {...sharedProps}>
				{navLink ? (
					<>{innerLinkData.pageTitle ?? innerLinkData.page?.name}</>
				) : (
					<ButtonInnerAnimation>
						{innerLinkData.pageTitle ?? innerLinkData.page?.name}
					</ButtonInnerAnimation>
				)}
			</CustomLink>
		);
	}

	return '';
});

InnerLink.displayName = 'InnerLink';
export default InnerLink;
