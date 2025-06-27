import { cubicBezier } from 'framer-motion';

// Container Animations to stagger children
export const animateContainer = {
	initial: {
		opacity: 0.99999,
	},
	animate: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			duration: 0.3,
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
			ease: cubicBezier(0.33, 1, 0.68, 1),
			duration: 1.2,
			opacity: {
				ease: 'easeOut',
				duration: 1,
			},
		},
	},
	exit: {
		y: 40,
		opacity: 0,
		transition: {
			ease: 'easeInOut',
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
			ease: 'easeInOut',
			duration: 1,
		},
	},
	exit: {
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 1,
			delay: 1,
		},
	},
};

// Button Animations
export const animateButtonContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
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
			ease: 'easeInOut',
			duration: 1,
		},
	},
};
