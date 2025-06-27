'use client';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';
import { ButtonType } from '@/types/Button';

import { motion } from 'framer-motion';

import { MouseEventHandler } from 'react';
import InnerLink from '../atoms/InnerLink';
import { animateButtonChild, animateButtonContainer } from '@/app/animations';

type ButtonBlockProps = {
	data: {
		_key?: string;
		_type?: string;
		buttons: ButtonType[];
		onClick?: MouseEventHandler<HTMLDivElement>;
	};
	className?: string;
	innerClassName?: string;
};

export default function ButtonBlock({
	data,
	className,
	innerClassName,
}: ButtonBlockProps) {
	return (
		<motion.div
			variants={animateButtonContainer}
			initial="initial"
			whileInView="animate"
			className={cn(
				'flex w-full flex-wrap items-center justify-center gap-2 md:gap-4',
				className,
			)}
		>
			{data.buttons?.map((button, index) => (
				<motion.div
					onClick={data.onClick}
					variants={animateButtonChild}
					key={index}
					className={innerClassName}
				>
					<Button
						variant={button.buttonType}
						size={button.buttonSize}
						asChild
					>
						<InnerLink
							innerLinkData={button.link}
							noAnimation={button.buttonType == 'nav'}
						/>
					</Button>
				</motion.div>
			))}
		</motion.div>
	);
}
