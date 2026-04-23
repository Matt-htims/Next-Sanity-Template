import { Inter } from 'next/font/google';

export type FontMode = 'google' | 'local' | 'adobe';

// Single source of truth for font setup.
// Change mode and Adobe links here when switching between google, local, and adobe.
const fontConfig: { mode: FontMode; adobeStylesheetHrefs: string[] } = {
	mode: 'google',
	adobeStylesheetHrefs: [],
};

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-body-family',
	display: 'swap',
});

export const siteFontMode: FontMode = fontConfig.mode;

export const siteFontClassName =
	siteFontMode === 'google' ? inter.variable : '';

export const siteFontHeadLinks =
	siteFontMode === 'adobe' ? fontConfig.adobeStylesheetHrefs : [];
