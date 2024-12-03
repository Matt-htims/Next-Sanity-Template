import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('font-heading font-bold', {
	variants: {
		textStyle: {
			h1: 'text-h2 md:text-h1',
			h2: 'text-h3 md:text-h2',
			h3: 'text-h4 md:text-h3',
			h4: 'text-h5 md:text-h4',
			h5: 'text-h5',
			h6: 'text-h6 font-medium',
			body: 'text-body-small sm:text-body font-normal',
			'body-small': 'text-body-small font-normal',
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
