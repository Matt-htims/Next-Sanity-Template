'use client';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';
import { ButtonType } from '@/types/Button';

import { motion } from 'framer-motion';

import { MouseEventHandler } from 'react';
import InnerLink from '../atoms/InnerLink';
import { animateButtonChild, animateButtonContainer } from '@/lib/animations';
import CornerSmoothing from '../atoms/CornerSmoothing';
import NavDropdownItem from '../Navbar/atoms/NavDropdownItem';

type ButtonBlockProps = {
	data: {
		_key?: string;
		_type?: string;
		buttons: ButtonType[];
		onClick?: MouseEventHandler<HTMLDivElement>;
	};
	className?: string;
	innerClassName?: string;
	mobile?: boolean;
};

export default function ButtonBlock({
	data,
	className,
	innerClassName,
	mobile = false,
}: ButtonBlockProps) {
	const handleDropdownClose = data.onClick
		? () => (data.onClick as unknown as () => void)()
		: undefined;

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
			{data.buttons?.map((button, index) =>
				button.dropdownItems?.length ? (
					<motion.div
						variants={animateButtonChild}
						key={index}
						className={innerClassName}
					>
						<NavDropdownItem
							button={button}
							mobile={mobile}
							onClose={handleDropdownClose}
						/>
					</motion.div>
				) : (
					<motion.div
						onClick={data.onClick}
						variants={animateButtonChild}
						key={index}
						className={innerClassName}
					>
						<CornerSmoothing
							themeRadiusFamily="controls"
							noCornerSmoothing={button.buttonVariant == 'nav'}
						>
							<Button
								variant={button.buttonVariant}
								size={button.buttonSize}
								asChild
							>
								<InnerLink
									innerLinkData={button.link}
									noAnimation={button.buttonVariant == 'nav'}
								/>
							</Button>
						</CornerSmoothing>
					</motion.div>
				),
			)}
		</motion.div>
	);
}
