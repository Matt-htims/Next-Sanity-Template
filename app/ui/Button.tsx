import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex group items-center cursor-pointer font-bold justify-center whitespace-nowrap rounded-full transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-button-primary text-button-primary-text',
				secondary: 'bg-button-secondary text-button-secondary-text',
				outline: 'border border-black rounded-full',
				link: 'text-black underline underline-offset-4',
				nav: 'text-black font-medium text-underline-simple',
			},
			size: {
				default: 'text-[26px] leading-none px-10 py-5',
				sm: 'text-[22px] leading-none px-6 py-3',
				lg: 'text-3xl leading-none px-12 py-6',
				nav: 'text-2xl lg:text-lg leading-none px-5 py-3',
			},
		},
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
