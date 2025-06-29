import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';
import { textStyles } from './Text';

const textVariants = cva('font-heading font-bold', {
	variants: {
		textStyle: textStyles,
	},
	defaultVariants: {
		textStyle: 'body',
	},
});

interface TextProps extends VariantProps<typeof textVariants> {
	as?: React.ElementType | string;
	className?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
	({ as: Component = 'p', className, textStyle, children, style }, ref) => {
		return (
			<Component
				ref={ref}
				className={cn(textVariants({ textStyle, className }), '')}
				style={style}
			>
				{children}
			</Component>
		);
	},
);

Text.displayName = 'Text';

const MotionText = motion(Text);

export { MotionText };
