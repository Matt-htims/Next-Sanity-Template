'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';

import { lenisScrollToAtom } from '@/app/Atoms';
import { CustomLink } from '../CustomLink';
import { LinkType } from '@/types/Link';
import ButtonInnerAnimation from './ButtonInnerAnimation';
import { easeInOutCubic } from '@/lib/animations/scrollEasing';

const InnerLink = forwardRef<
	HTMLAnchorElement,
	{
		innerLinkData: LinkType;
		noAnimation?: boolean;
	} & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ innerLinkData, noAnimation, className, ...props }, ref) => {
	const setLenisScrollTo = useSetAtom(lenisScrollToAtom);
	const childContent = props.children;

	const getLabel = (fallback?: React.ReactNode) => {
		if (childContent !== undefined && childContent !== null) {
			return childContent;
		}
		return fallback ?? null;
	};

	const sharedProps = {
		className,
		ref,
		...props,
	};

	if (innerLinkData?.linkType == 'default') {
		return (
			<CustomLink
				href={
					(innerLinkData.page?.slug.charAt(0) == '/' ? '' : '/') +
					innerLinkData.page?.slug
				}
				{...sharedProps}
			>
				{noAnimation ? (
					<>
						{getLabel(
							innerLinkData.pageTitle ?? innerLinkData.page?.name,
						)}
					</>
				) : (
					<ButtonInnerAnimation>
						{getLabel(
							innerLinkData.pageTitle ?? innerLinkData.page?.name,
						)}
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
					{noAnimation ? (
						<>{getLabel(innerLinkData.displayName)}</>
					) : (
						<ButtonInnerAnimation>
							{getLabel(innerLinkData.displayName)}
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
				{noAnimation ? (
					<>{getLabel(innerLinkData.displayName)}</>
				) : (
					<ButtonInnerAnimation>
						{getLabel(innerLinkData.displayName)}
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
						easing: easeInOutCubic,
					});
				}}
				{...sharedProps}
			>
				{noAnimation ? (
					<>{getLabel(innerLinkData.displayName)}</>
				) : (
					<ButtonInnerAnimation>
						{getLabel(innerLinkData.displayName)}
					</ButtonInnerAnimation>
				)}
			</Link>
		);
	}

	if (innerLinkData?.linkType == 'anchorLinkDifferentPage') {
		const href =
			(innerLinkData.page?.slug.charAt(0) == '/' ? '' : '/') +
			innerLinkData.page?.slug +
			'#' +
			innerLinkData.anchorLink;
		return (
			<CustomLink href={href} {...sharedProps}>
				{noAnimation ? (
					<>
						{getLabel(
							innerLinkData.pageTitle ?? innerLinkData.page?.name,
						)}
					</>
				) : (
					<ButtonInnerAnimation>
						{getLabel(
							innerLinkData.pageTitle ?? innerLinkData.page?.name,
						)}
					</ButtonInnerAnimation>
				)}
			</CustomLink>
		);
	}

	return null;
});

InnerLink.displayName = 'InnerLink';
export default InnerLink;
