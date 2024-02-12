'use client';
import { useRef } from 'react';

// Animation
import {
	motion,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion';

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
				if (document.body.classList.contains('dark')) {
				} else {
					document.body.classList.add('dark');
					document.body.classList.remove('light');
				}
			} else {
				if (document.body.classList.contains('light')) {
				} else {
					document.body.classList.add('light');
					document.body.classList.remove('dark');
				}
			}
		} else {
			if (latest > 0) {
				if (document.body.classList.contains('light')) {
				} else {
					document.body.classList.add('light');
					document.body.classList.remove('dark');
				}
			} else {
				if (document.body.classList.contains('dark')) {
				} else {
					document.body.classList.add('dark');
					document.body.classList.remove('light');
				}
			}
		}
	});

	return <div ref={ref} className="theme-switch w-full "></div>;
}
