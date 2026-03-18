'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easeOutCurve } from '@/lib/animations/easings';
import { cn } from '@/lib/utils';
import { breakText } from '@/lib/breakText';
import RichText from '../../atoms/RichText';
import { Text } from '../../atoms/Text';

// Components
import RevealOnScrollText from './RevealOnScrollText';

import { TextWithOptions } from '@/types/TextWithOptions';
import { getLayoutWidthClassName } from '@/lib/layoutWidth';
import { Container } from '../../atoms/Container';

type StandaloneTextProps = {
	data: {
		_key: string;
		_type: string;
		title: string;
		useSimpleText: boolean;
		centered?: boolean;
		simpleText: TextWithOptions;
		richText: Array<any>;
		textAnimation: string;
		maxWidth?: string;
		positionOptions?: {
			alignment?: string;
			width?: string;
			maxWidth?: number;
		};
	};
};

export default function StandaloneText({ data }: StandaloneTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.4, once: true });
	const widthClassName = getLayoutWidthClassName(data.maxWidth);
	const isCentered = !!data.centered;

	if (data.useSimpleText) {
		if (data.textAnimation == 'fadeIn') {
			return (
				<Container as="section" ref={ref} className="mb-3.5 sm:mb-8">
					<motion.div
						variants={textAnimation}
						initial="initial"
						animate={isInView ? 'animate' : 'initial'}
					>
						<Text
							as={data.simpleText.textOptions.textType}
							textStyle={data.simpleText.textOptions.textStyle}
							className={cn(widthClassName, {
								'text-center': isCentered,
							})}
						>
							{breakText(data.simpleText.text)}
						</Text>
					</motion.div>
				</Container>
			);
		} else if (data.textAnimation == 'scrollReveal') {
			return (
				<Container as="section" className="mb-3.5 sm:mb-8">
					<RevealOnScrollText
						text={data.simpleText.text}
						textStyle={
							data.simpleText.textOptions?.textStyle ?? 'h2'
						}
						className={cn(widthClassName, {
							'text-center': isCentered,
						})}
					/>
				</Container>
			);
		} else {
			return (
				<Container as="section" className="mb-3.5 sm:mb-8">
					<Text
						as={data.simpleText.textOptions.textType}
						textStyle={data.simpleText.textOptions.textStyle}
						className={cn(widthClassName, {
							'text-center': isCentered,
						})}
					>
						{breakText(data.simpleText.text)}
					</Text>
				</Container>
			);
		}
	} else {
		return (
			<Container as="section" ref={ref} className="mb-3.5 sm:mb-7">
				<motion.div
					variants={textAnimation}
					initial="initial"
					animate={isInView ? 'animate' : 'initial'}
					className={cn(widthClassName, {
						'text-center': isCentered,
					})}
				>
					<RichText data={data.richText} />
				</motion.div>
			</Container>
		);
	}
}

// Animations
const textAnimation = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
			ease: easeOutCurve,
		},
	},
};
