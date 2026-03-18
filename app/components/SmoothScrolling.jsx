'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

import { useAtom } from 'jotai';
import { lenisScrollToAtom } from '../Atoms';
import { easeInOutCubic } from '@/lib/animations/scrollEasing';

function SmoothScrolling({ children }) {
	const lenisRef = useRef();
	const pathname = usePathname();

	const [lenisScrollTo, setLenisScrollTo] = useAtom(lenisScrollToAtom);

	// Force scroll to top of page on page change
	useEffect(() => {
		if (window.location.hash) return;

		const frame = requestAnimationFrame(() => {
			lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
		});

		return () => cancelAnimationFrame(frame);
	}, [pathname]);

	// Scroll to id when lenisScrollTo state changes
	useEffect(() => {
		if (!lenisScrollTo.id) return;

		lenisRef.current?.lenis?.scrollTo(lenisScrollTo.id, {
			offset: -lenisScrollTo.offset,
			duration: lenisScrollTo.duration,
			easing: lenisScrollTo.easing,
			lerp: 0.2,
		});

		// Consume one-shot scroll intent so it doesn't accidentally replay.
		setLenisScrollTo((prev) => ({ ...prev, id: '' }));
	}, [lenisScrollTo, setLenisScrollTo]);

	// Scroll to anchor on page change
	useEffect(() => {
		const anchor = window.location.hash;
		if (!anchor) return;

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		let attempts = 0;
		const maxAttempts = 20;
		let cancelled = false;

		const tryAnchorScroll = () => {
			if (cancelled) return;

			attempts += 1;
			const target = document.querySelector(anchor);

			if (target || attempts >= maxAttempts) {
				if (target) {
					lenisRef.current?.lenis?.scrollTo(anchor, {
						offset: -100,
						duration: prefersReducedMotion ? 0 : 2.5,
						immediate: prefersReducedMotion,
						easing: easeInOutCubic,
						lerp: 0.2,
					});
				}
				return;
			}

			setTimeout(tryAnchorScroll, 120);
		};

		tryAnchorScroll();

		return () => {
			cancelled = true;
		};
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
