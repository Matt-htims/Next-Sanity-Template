import { atom } from 'jotai';
import { easeInOutCubic } from '@/lib/animations/scrollEasing';

export const lenisScrollToAtom = atom({
	id: '',
	offset: 0,
	duration: 0.5,
	easing: easeInOutCubic,
});

export const firstPageLoadAtom = atom(false);

export const startPageTransitionAtom = atom(false);

export const newHrefAtom = atom('');

export const mobileMenuOpenAtom = atom(false);

export const navHeightAtom = atom(0);

export const navDarkAtom = atom(false);
