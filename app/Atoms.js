import { atom } from 'jotai';

export const pageTransitionAtom = atom({ state: false, color: '' });

export const lenisScrollToAtom = atom({
	id: '',
	offset: 0,
	duration: 0.5,
	easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
});

export const mobileMenuOpenAtom = atom(false);
