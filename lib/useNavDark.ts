import { useEffect, RefObject } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { navDarkAtom, navHeightAtom } from '@/app/Atoms';

export function useNavDark(ref: RefObject<Element | null>, active = true) {
	const navHeight = useAtomValue(navHeightAtom);
	const setNavDark = useSetAtom(navDarkAtom);

	// Reset navDark only on unmount, not on every observer recreation.
	// This prevents the flash caused by navHeight changes (e.g. banner
	// animating back in after mobile menu closes) triggering a brief false.
	useEffect(() => {
		return () => setNavDark(false);
	}, [setNavDark]);

	useEffect(() => {
		if (!active) return;
		const el = ref.current;
		if (!el) return;

		// Create a detection strip exactly as tall as the navbar at the top of
		// the viewport. When a dark section enters that strip the nav goes inverse.
		const observer = new IntersectionObserver(
			([entry]) => setNavDark(entry.isIntersecting),
			{
				rootMargin: `0px 0px -${window.innerHeight - navHeight - 1}px 0px`,
				threshold: 0,
			},
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [active, navHeight, setNavDark]);
}
