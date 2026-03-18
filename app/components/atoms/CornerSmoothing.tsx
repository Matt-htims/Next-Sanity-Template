'use client';

import { cn } from '@/lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';
import { Squircle } from 'corner-smoothing';
import { useSyncExternalStore } from 'react';

function getCssVarNumber(varName: string, fallback: number): number {
	if (typeof window === 'undefined') return fallback;

	const raw = getComputedStyle(document.documentElement)
		.getPropertyValue(varName)
		.trim();
	const parsed = Number.parseFloat(raw);

	return Number.isFinite(parsed) ? parsed : fallback;
}

type ThemeRadiusFamily = 'site' | 'controls';

export default function CornerSmoothing({
	children,
	className,
	cornerRadius,
	noCornerSmoothing,
	noBottomCornerSmoothing,
	mobileCornerRadius,
	themeRadiusFamily = 'site',
}: {
	children: React.ReactNode;
	className?: string;
	cornerRadius?: number;
	noCornerSmoothing?: boolean;
	noBottomCornerSmoothing?: boolean;
	mobileCornerRadius?: number;
	themeRadiusFamily?: ThemeRadiusFamily;
}) {
	const { width } = useWindowSize();
	const isHydrated = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const desktopRadiusVarName =
		themeRadiusFamily === 'controls'
			? '--site-controls-radius'
			: '--site-radius';
	const mobileRadiusVarName =
		themeRadiusFamily === 'controls'
			? '--site-controls-radius-mobile'
			: '--site-radius-mobile';

	const themeDesktopRadius = isHydrated
		? getCssVarNumber(desktopRadiusVarName, 16)
		: 16;
	const themeMobileRadius = isHydrated
		? getCssVarNumber(mobileRadiusVarName, themeDesktopRadius)
		: themeDesktopRadius;
	const themeMobileBreakpoint = isHydrated
		? getCssVarNumber('--site-radius-mobile-breakpoint', 640)
		: 640;

	const isMobile = !!width && width < themeMobileBreakpoint;
	const resolvedDesktopRadius = cornerRadius ?? themeDesktopRadius;
	const resolvedMobileRadius = mobileCornerRadius ?? themeMobileRadius;
	const hasMobileCornerRadiusOverride = mobileCornerRadius !== undefined;
	const isUsingThemeDefaults =
		cornerRadius === undefined && mobileCornerRadius === undefined;

	if (noCornerSmoothing) {
		return <div className={cn(className)}>{children}</div>;
	}

	// When no props are passed, pull both desktop/mobile defaults from theme tokens.
	const resolvedCornerRadius = isUsingThemeDefaults
		? isMobile
			? resolvedMobileRadius
			: resolvedDesktopRadius
		: hasMobileCornerRadiusOverride
			? isMobile
				? resolvedMobileRadius
				: resolvedDesktopRadius
			: resolvedDesktopRadius !== 16 &&
				  resolvedDesktopRadius !== 0 &&
				  isMobile
				? resolvedDesktopRadius / 2
				: resolvedDesktopRadius;

	const squircleStyle = noBottomCornerSmoothing
		? {
				borderTopLeftRadius: resolvedCornerRadius,
				borderTopRightRadius: resolvedCornerRadius,
			}
		: { borderRadius: resolvedCornerRadius };

	return (
		<Squircle
			style={squircleStyle}
			className={cn('overflow-hidden', className)}
			cornerRadius={resolvedCornerRadius}
			bottomRightCornerRadius={noBottomCornerSmoothing ? 0 : undefined}
			bottomLeftCornerRadius={noBottomCornerSmoothing ? 0 : undefined}
		>
			{children}
		</Squircle>
	);
}
