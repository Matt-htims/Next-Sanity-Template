import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

const textVariants = cva('font-heading font-bold', {
	variants: {
		textStyle: {
			default:
				'text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] font-body font-normal',
			h1: 'text-[50px] leading-[60px] md:text-[64px] md:leading-[74px]',
			h2: 'text-[28px] leading-[40px] md:text-[36px] md:leading-[46px]',
			h3: 'text-[18px] leading-[24px] md:text-[28px] md:leading-[40px]',
			h4: 'text-[18px] leading-[24px]',
			h5: 'text-[20px] leading-[30px]',
			h6: 'text-[16px] leading-[24px]',
			body: 'text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] font-body font-normal',
		},
	},
	defaultVariants: {
		textStyle: 'default',
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

const MotionText = motion(Text);

export { Text, textVariants, MotionText };
