'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useSetAtom } from 'jotai';
import { pageTransitionAtom } from '../Atoms';

interface RedirectButtonProps {
	href: string;
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
}

function transitionColor(href: string) {
	switch (href) {
		case '/':
			return 'bg-white';
		default:
			return 'bg-white';
	}
}

export const CustomLink = ({
	href,
	onClick,
	className,
	children,
}: RedirectButtonProps) => {
	const router = useRouter();

	const setPageTransition = useSetAtom(pageTransitionAtom);

	const onClickHandler = React.useCallback(() => {
		// console.log(pathname, href);

		// if (pathname == href) {
		// 	return '';
		// }
		setPageTransition((prev) => ({
			...prev,
			color: transitionColor(href),
		}));
		router.prefetch(href);
		setPageTransition((prev) => ({
			...prev,
			state: true,
		}));

		// trigger redirect right before exit animation end
		window.setTimeout(() => {
			if (onClick) {
				onClick();
			}
			router.push(href);
			setPageTransition((prev) => ({
				...prev,
				state: false,
			}));
		}, 700);
	}, [href, onClick, router, setPageTransition]);

	return (
		<button className={className} onClick={onClickHandler}>
			{children}
		</button>
	);
};
