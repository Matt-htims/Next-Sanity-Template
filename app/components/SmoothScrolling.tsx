'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

function SmoothScrolling({ children }: { children: React.ReactNode }) {
	return (
		<ReactLenis
			root
			options={{
				// lerp: 0.06,
				// duration: 2.5,
				smoothTouch: false,
				// wheelMultiplier: 2,
				// touchMultiplier: 4.9,
				// easing: (x: any) => 1 - Math.pow(1 - x, 6),
			}}
		>
			{children}
		</ReactLenis>
	);
}

export default SmoothScrolling;
