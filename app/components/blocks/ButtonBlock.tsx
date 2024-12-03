'use client';
import Link from 'next/link';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';
import { ButtonType } from '@/types/Button';

import { CustomLink } from '../CustomLink';

import { useSetAtom } from 'jotai';

import { motion, cubicBezier } from 'framer-motion';
import ButtonInnerAnimation from '../atoms/ButtonInnerAnimation';
import { MouseEventHandler } from 'react';

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
			{data.buttons?.map((button, index) => {
				if (
					button.customLink &&
					button.link &&
					Array.from(button.link)[0] == '/'
				) {
					return (
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
								<CustomLink href={button.link}>
									{button.buttonType == 'nav' ? (
										<>{button.displayName}</>
									) : (
										<>
											<ButtonInnerAnimation>
												{button.displayName}
											</ButtonInnerAnimation>
										</>
									)}
								</CustomLink>
							</Button>
						</motion.div>
					);
				} else if (button.customLink) {
					return (
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
								<a
									target="_blank"
									rel="noindex nofollow"
									href={button.link}
								>
									{button.buttonType == 'nav' ? (
										<>{button.displayName}</>
									) : (
										<>
											<ButtonInnerAnimation>
												{button.displayName}
											</ButtonInnerAnimation>
										</>
									)}
								</a>
							</Button>
						</motion.div>
					);
				}
				return (
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
							<CustomLink href={'/' + button.page?.slug}>
								{button.buttonType == 'nav' ? (
									<>
										{button.pageTitle
											? button.pageTitle
											: button.page?.name}
									</>
								) : (
									<>
										<ButtonInnerAnimation>
											{button.pageTitle
												? button.pageTitle
												: button.page?.name}
										</ButtonInnerAnimation>
									</>
								)}
							</CustomLink>
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
