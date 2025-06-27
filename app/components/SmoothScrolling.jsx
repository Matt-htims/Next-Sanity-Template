'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

import { useAtom } from 'jotai';
import { lenisScrollToAtom } from '../Atoms';

function SmoothScrolling({ children }) {
	const lenisRef = useRef();
	const pathname = usePathname();

	const [lenisScrollTo, setLenisScrollTo] = useAtom(lenisScrollToAtom);

	// Force scroll to top of page on page change
	useEffect(() => {
		setTimeout(() => {
			if (lenisRef?.current) {
				lenisRef.current.lenis.scrollTo(0, { immediate: true });
				// console.log('scrolled');
			}
		}, 100);
	}, [pathname]);

	// Scroll to id when lenisScrollTo state changes
	useEffect(() => {
		if (lenisScrollTo.id) {
			lenisRef.current?.lenis?.scrollTo(lenisScrollTo.id, {
				offset: -lenisScrollTo.offset,
				duration: lenisScrollTo.duration,
				easing: lenisScrollTo.easing,
				lerp: 0.2,
			});
		}
	}, [lenisScrollTo]);

	// Scroll to anchor on page change
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const anchor = window.location.hash;
			if (anchor) {
				setTimeout(() => {
					setLenisScrollTo({
						id: anchor,
						offset: 100,
						duration: 2.5,
						easing: (x) =>
							x < 0.5
								? 4 * x * x * x
								: 1 - Math.pow(-2 * x + 2, 3) / 2,
					});
				}, 500);
			}
		}
	}, [pathname]);

	return (
		<ReactLenis
			ref={lenisRef}
			root
			options={
				{
					// lerp: 0.06,
					// duration: 2.5,
					// wheelMultiplier: 2,
					// touchMultiplier: 4.9,
					// easing: (x) => 1 - Math.pow(1 - x, 6),
				}
			}
		>
			{children}
		</ReactLenis>
	);
}

export default SmoothScrolling;
