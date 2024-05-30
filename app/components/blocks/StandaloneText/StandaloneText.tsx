'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { breakText } from '@/app/utils/breakText';
import RichText from '../../atoms/RichText';

// Components
import RevealOnScrollText from './RevealOnScrollText';

// Standalone Text Helpers
import { textStyle, alignment, width } from './standaloneTextHelpers';

type StandaloneTextProps = {
	data: {
		_key: string;
		_type: string;
		title: string;
		useSimpleText: boolean;
		simpleText: string;
		richText: Array<any>;
		textAnimation: string;
		textOptions: {
			textStyle: string;
			textType: string;
			centreAlignText: boolean;
		};
		positionOptions: {
			alignment: string;
			width: string;
		};
	};
};

export default function StandaloneText({ data }: StandaloneTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.4, once: true });

	const CustomTag =
		data.useSimpleText && data.textOptions?.textType
			? (data.textOptions?.textType as keyof JSX.IntrinsicElements)
			: ('p' as keyof JSX.IntrinsicElements);

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
					<div
						className={`col-span-12 sm:col-span-10 ${width(
							data.positionOptions?.width,
						)} ${alignment(
							data.positionOptions?.alignment,
						)} ${textStyle(data.textOptions?.textStyle)} ${
							data.textOptions.centreAlignText
								? 'text-center'
								: ''
						}`}
					>
						<CustomTag>{breakText(data.simpleText)}</CustomTag>
					</div>
				</motion.section>
			);
		} else if (data.textAnimation == 'scrollReveal') {
			return (
				<section className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-8">
					<RevealOnScrollText
						text={data.simpleText}
						className={`col-span-12 sm:col-span-10 ${width(
							data.positionOptions?.width,
						)} ${alignment(
							data.positionOptions?.alignment,
						)} ${textStyle(data.textOptions?.textStyle)} ${
							data.textOptions.centreAlignText
								? 'text-center'
								: ''
						}`}
					/>
				</section>
			);
		} else {
			return (
				<section className="contained mb-3.5 grid grid-cols-12 gap-5 sm:mb-8">
					<CustomTag
						className={`col-span-12 sm:col-span-10 ${width(
							data.positionOptions?.width,
						)} ${alignment(
							data.positionOptions?.alignment,
						)} ${textStyle(data.textOptions?.textStyle)} ${
							data.textOptions.centreAlignText
								? 'text-center'
								: ''
						}`}
					>
						{breakText(data.simpleText)}
					</CustomTag>
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
