import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

const textVariants = cva('font-heading font-bold', {
	variants: {
		textStyle: {
			h1: 'text-[50px] leading-[60px] md:text-h1',
			h2: 'text-[28px] leading-[40px] md:text-h2',
			h3: 'text-[18px] leading-[24px] md:text-h3 font-light',
			h4: 'text-h4 font-normal',
			h5: 'text-h5 font-medium',
			h6: 'text-h6 font-medium',
			body: 'text-body-small md:text-body font-body font-light',
		},
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
	({ as: Component = 'h2', className, textStyle, children, style }, ref) => {
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

export { Text, textVariants };
