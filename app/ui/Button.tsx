import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { buttonVariants as buttonVariantsImport } from '../MasterButton';

const buttonVariants = cva(
	'inline-flex group items-center cursor-pointer font-bold justify-center whitespace-nowrap transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: buttonVariantsImport,
		compoundVariants: [
			// Applies a custom additional class for the variant and sizes shown below.
			// Removes padding if the style is link
			{
				variant: 'link',
				size: ['default', 'sm', 'lg'],
				class: 'p-0',
			},
			{
				variant: 'nav',
				size: ['default', 'sm', 'lg', 'nav'],
				class: 'p-0',
			},
		],
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ size, variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
