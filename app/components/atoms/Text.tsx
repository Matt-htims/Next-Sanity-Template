import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const textStyles = {
	h1: 'text-[49px] leading-[54px] md:text-[64px] md:leading-[68px]',
	h2: 'text-[32px] leading-[38px] md:text-[48px] md:leading-[54px]',
	h3: 'text-[28px] leading-[34px] md:text-[32px] md:leading-[38px]',
	h4: 'text-[24px] leading-[30px] md:text-[28px] md:leading-[34px]',
	h5: 'text-[24px] leading-[30px]',
	h6: 'text-[18px] leading-[22px]',
	body: 'text-[16px] leading-[22px] sm:text-[24px] sm:leading-[34px] font-normal',
	'body-small': 'text-[16px] leading-[22px] font-normal',
};

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

export { Text, textVariants };
