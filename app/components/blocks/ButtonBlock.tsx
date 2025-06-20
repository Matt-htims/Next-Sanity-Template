'use client';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';
import { ButtonType } from '@/types/Button';

import { motion } from 'framer-motion';

import { MouseEventHandler } from 'react';
import InnerLink from '../atoms/InnerLink';

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
			variants={animateContainer}
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
					variants={animateChild}
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
							navLink={button.buttonType == 'nav'}
						/>
					</Button>
				</motion.div>
			))}
		</motion.div>
	);
}

const animateContainer = {
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

const animateChild = {
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
