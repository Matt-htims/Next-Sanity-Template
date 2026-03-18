import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const containerVariants = cva('mx-auto w-full', {
	variants: {
		width: {
			site: 'max-w-site',
			full: 'max-w-none',
		},
		gutter: {
			default: 'px-5 md:px-10',
			none: 'px-0',
		},
		box: {
			content: 'box-content',
			border: 'box-border',
		},
	},
	defaultVariants: {
		width: 'site',
		gutter: 'default',
		box: 'content',
	},
});

interface ContainerProps
	extends
		React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof containerVariants> {
	as?: React.ElementType;
}

const Container = React.forwardRef<HTMLElement, ContainerProps>(
	(
		{
			as: Component = 'div',
			className,
			width,
			gutter,
			box,
			children,
			...rest
		},
		ref,
	) => {
		return (
			<Component
				ref={ref}
				className={cn(
					containerVariants({ width, gutter, box }),
					className,
				)}
				{...rest}
			>
				{children}
			</Component>
		);
	},
);

Container.displayName = 'Container';

export { Container };
