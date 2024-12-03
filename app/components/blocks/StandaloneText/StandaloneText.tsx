'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { breakText } from '@/app/utils/breakText';
import RichText from '../../atoms/RichText';
import { Text } from '../../atoms/Text';

// Components
import RevealOnScrollText from './RevealOnScrollText';

// Standalone Text Helpers
import { textStyle, alignment, width } from './standaloneTextHelpers';
import { TextWithOptions } from '@/types/TextWithOptions';

type StandaloneTextProps = {
	data: {
		_key: string;
		_type: string;
		title: string;
		useSimpleText: boolean;
		simpleText: TextWithOptions;
		richText: Array<any>;
		textAnimation: string;
		positionOptions: {
			alignment: string;
			width: string;
			maxWidth?: number;
		};
	};
};

export default function StandaloneText({ data }: StandaloneTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.4, once: true });

	if (data.useSimpleText) {
		if (data.textAnimation == 'fadeIn') {
			return (
				<motion.section
					ref={ref}
					variants={textAnimation}
					initial="initial"
					animate={isInView ? 'animate' : 'initial'}
					className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-8"
				>
					<Text
						as={data.simpleText.textOptions.textType}
						textStyle={data.simpleText.textOptions.textStyle}
						style={{ maxWidth: data.positionOptions.maxWidth }}
						className={cn(
							'col-span-12 sm:col-span-10',
							width(data.positionOptions.width),
							alignment(data.positionOptions.alignment),
							{
								'text-center':
									data.simpleText.textOptions.textCentered,
							},
						)}
					>
						{breakText(data.simpleText.text)}
					</Text>
				</motion.section>
			);
		} else if (data.textAnimation == 'scrollReveal') {
			return (
				<section
					style={{ maxWidth: data.positionOptions.maxWidth }}
					className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-8"
				>
					<RevealOnScrollText
						text={data.simpleText.text}
						textStyle={
							data.simpleText.textOptions?.textStyle ?? 'h2'
						}
						className={cn(
							'col-span-12 sm:col-span-10',
							width(data.positionOptions?.width),
							alignment(data.positionOptions?.alignment),
							{
								'text-center':
									data.simpleText.textOptions.textCentered,
							},
						)}
					/>
				</section>
			);
		} else {
			return (
				<section className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-8">
					<Text
						as={data.simpleText.textOptions.textType}
						textStyle={data.simpleText.textOptions.textStyle}
						style={{ maxWidth: data.positionOptions.maxWidth }}
						className={cn(
							'col-span-12 sm:col-span-10',
							width(data.positionOptions.width),
							alignment(data.positionOptions.alignment),
							{
								'text-center':
									data.simpleText.textOptions.textCentered,
							},
						)}
					>
						{breakText(data.simpleText.text)}
					</Text>
				</section>
			);
		}
	} else {
		return (
			<motion.section
				ref={ref}
				className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-7"
				variants={textAnimation}
				initial="initial"
				animate={isInView ? 'animate' : 'initial'}
			>
				<motion.div
					variants={textAnimation}
					initial="initial"
					animate={isInView ? 'animate' : 'initial'}
					className={`col-span-12 sm:col-span-10 ${width(
						data.positionOptions?.width,
					)} ${alignment(data.positionOptions?.alignment)}`}
					style={{ maxWidth: data.positionOptions.maxWidth }}
				>
					<RichText data={data.richText} />
				</motion.div>
			</motion.section>
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
			ease: 'easeOut',
		},
	},
};
