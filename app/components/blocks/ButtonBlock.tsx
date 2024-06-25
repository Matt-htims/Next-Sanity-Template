'use client';
import Link from 'next/link';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';
import { ButtonType } from '@/types/Button';

import { motion, cubicBezier } from 'framer-motion';

type ButtonBlockProps = {
	data: {
		_key: string;
		_type: string;
		buttons: ButtonType[];
	};
	className?: string;
};

export default function ButtonBlock({ data, className }: ButtonBlockProps) {
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
			{data.buttons?.map((button, index) => {
				if (button.customLink) {
					return (
						<motion.div variants={animateChild} key={index}>
							<Button
								variant={button.buttonType}
								size={button.buttonSize}
								asChild
							>
								<a
									target="_blank"
									rel="noindex nofollow"
									href={button.link}
								>
									{button.displayName}
								</a>
							</Button>
						</motion.div>
					);
				}
				return (
					<motion.div variants={animateChild} key={index}>
						<Button
							variant={button.buttonType}
							size={button.buttonSize}
							asChild
						>
							<Link href={'/' + button.page?.slug ?? ''}>
								{button.pageTitle
									? button.pageTitle
									: button.page?.name}
							</Link>
						</Button>
					</motion.div>
				);
			})}
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
