'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

function SmoothScrolling({ children }) {
	const lenisRef = useRef();

	const pathname = usePathname();

	useEffect(() => {
		setTimeout(() => {
			if (lenisRef?.current) {
				lenisRef.current.lenis.scrollTo(0, { immediate: true });
				// console.log('scrolled');
			}
		}, 100);
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
