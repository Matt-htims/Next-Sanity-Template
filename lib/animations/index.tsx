import { cubicBezier } from 'framer-motion';

export const customEasing = cubicBezier(0.22, 1, 0.36, 1);


// Container Animations to stagger children
export const animateContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.08,
		},
	},
};

export const animateContainerDelay = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			duration: 0.8,
			staggerChildren: 0.08,
		},
	},
};

// Child animations
export const animateChildUp = {
	initial: {
		opacity: 0,
		y: 40,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			ease: customEasing,
			duration: 1.2,
			opacity: {
				ease: 'easeOut'	as const,
				duration: 1,
			},
		},
	},
	exit: {
		y: 40,
		opacity: 0,
		transition: {
			ease: 'easeInOut' as const,
			duration: 0.6,
		},
	},
};

export const animateChildFadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
				ease: 'easeInOut' as const,
				duration: 1,
			},
	},
	exit: {
		opacity: 1,
		transition: {
			ease: 'easeInOut' as const,
			duration: 1,
			delay: 1,
		},
	},
};

// Button Animations
export const animateButtonContainer = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.2,
			when: 'beforeChildren',
			staggerChildren: 0.08,
		},
	},
};

export const animateButtonChild = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			ease: 'easeInOut' as const,
			duration: 1.2,
		},
	},
};
