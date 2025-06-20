'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { pageTransitionAtom } from '../Atoms';
import { cn } from '@/lib/utils';

export interface CustomLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

function transitionColor(href: string) {
	switch (href) {
		case '/':
			return 'bg-white';
		default:
			return 'bg-white';
	}
}

export const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
	({ href, className, onClick, children, ...props }, ref) => {
		const router = useRouter();
		const setPageTransition = useSetAtom(pageTransitionAtom);

		const onClickHandler = React.useCallback(
			(e: React.MouseEvent<HTMLAnchorElement>) => {
				// Allow parent onClick to run
				onClick?.(e);

				if (e.defaultPrevented) return;

				// Prevent default link behavior
				e.preventDefault();

				setPageTransition((prev) => ({
					...prev,
					color: transitionColor(href),
				}));
				router.prefetch(href);
				setPageTransition((prev) => ({
					...prev,
					state: true,
				}));

				window.setTimeout(() => {
					router.push(href);
					setPageTransition((prev) => ({
						...prev,
						state: false,
					}));
				}, 700);
			},
			[href, onClick, router, setPageTransition],
		);

		return (
			<a
				href={href}
				ref={ref}
				className={cn('cursor-pointer', className)}
				onClick={onClickHandler}
				{...props}
			>
				{children}
			</a>
		);
	},
);

CustomLink.displayName = 'CustomLink';
