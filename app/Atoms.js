import { atom } from 'jotai';

export const lenisScrollToAtom = atom({
	id: '',
	offset: 0,
	duration: 0.5,
	easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
});

export const firstPageLoadAtom = atom(false);

export const pageTransitionAtom = atom({
	firstPageLoad: false,
	startPageTransition: false,
	newHref: '',
});

export const startPageTransitionAtom = atom(false);

export const mobileMenuOpenAtom = atom(false);
