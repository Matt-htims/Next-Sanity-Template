'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { useSetAtom } from 'jotai';
import { startPageTransitionAtom, newHrefAtom } from '../Atoms';

export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

export const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
	({ href, className, onClick, children, ...props }, ref) => {
		const router = useRouter();
		const path = usePathname();

		const setStartPageTransition = useSetAtom(startPageTransitionAtom);

		const setNewHref = useSetAtom(newHrefAtom);

		return (
			<Link
				href={href}
				ref={ref}
				className={cn('cursor-pointer', className)}
				onClick={(e) => {
					onClick?.(e);

					// Let the browser/Next handle modified-click behavior (new tab, etc.).
					if (
						e.defaultPrevented ||
						e.metaKey ||
						e.ctrlKey ||
						e.shiftKey ||
						e.altKey ||
						e.button !== 0
					) {
						return;
					}

					const isHashOnlyLink = href.startsWith('#');
					const resolvedUrl = new URL(href, window.location.origin);
					const targetPath = resolvedUrl.pathname;
					const isSamePathHashNavigation =
						!!resolvedUrl.hash && targetPath === path;

					// Hash navigation on the current route should not trigger page transitions.
					if (isHashOnlyLink || isSamePathHashNavigation) {
						return;
					}

					e.preventDefault();

					if (path !== targetPath) {
						setStartPageTransition(true);
						setNewHref(targetPath);

						setTimeout(() => {
							router.push(href, {
								scroll: !resolvedUrl.hash,
							});
						}, 650);
					}
				}}
				{...props}
			>
				{children}
			</Link>
		);
	},
);

CustomLink.displayName = 'CustomLink';

const pageAnimation = () => {
	document.documentElement.animate(
		[
			{
				opacity: 1,
			},
			{
				opacity: 1,
			},
		],
		{
			duration: 1000,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-old(root)',
		},
	);

	document.documentElement.animate(
		[
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
		],
		{
			duration: 1000,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)',
		},
	);
};
