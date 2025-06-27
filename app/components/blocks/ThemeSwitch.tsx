'use client';
import { useRef } from 'react';

// Animation
import { useScroll, useMotionValueEvent } from 'framer-motion';

type ThemeSwitchProps = {
	data: {
		_key: string;
		_type: string;
		theme: string;
	};
};

export default function ThemeSwitch({ data }: ThemeSwitchProps) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start 0.2', 'start'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (data.theme == 'dark') {
			if (latest > 0) {
				if (document.documentElement.dataset.theme == 'dark') {
				} else {
					document.documentElement.dataset.theme = 'dark';
				}
			} else {
				if (document.documentElement.dataset.theme == 'light') {
				} else {
					document.documentElement.dataset.theme = 'light';
				}
			}
		} else {
			if (latest > 0) {
				if (document.documentElement.dataset.theme == 'light') {
				} else {
					document.documentElement.dataset.theme = 'light';
				}
			} else {
				if (document.documentElement.dataset.theme == 'dark') {
				} else {
					document.documentElement.dataset.theme = 'dark';
				}
			}
		}
	});

	return <div ref={ref} className="theme-switch w-full"></div>;
}
