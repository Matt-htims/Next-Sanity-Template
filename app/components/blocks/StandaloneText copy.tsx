'use client';
import { useRef, useState } from 'react';
import {
	motion,
	useInView,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion';
import { breakText } from '@/app/utils/breakText';
import RichText from '../atoms/RichText';

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

function RevealOnScrollText({
	text,
	className,
}: {
	text: string;
	className: any;
}) {
	const textref = useRef(null);
	// const isInView = useInView(textref, { amount: 0.5 });

	const [wordRevealState, setWordRevealState] = useState(0);

	const wordNo = text.split(' ').length ?? 0;

	const { scrollYProgress } = useScroll({
		target: textref,
		offset: ['start 0.9', 'end 0.5'],
	});

	let wordReveal: any = useTransform(
		scrollYProgress,
		[0, 1],
		[-10, wordNo + 10]
	);

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		// console.log(latest, wordReveal, wordNo);
		setWordRevealState(wordReveal.current);
	});
	return (
		<div className={className} ref={textref}>
			<span className="sr-only">{text}</span>
			<span aria-hidden>
				{text.split(' ').map((word, index) => (
					<motion.span
						variants={animateSimpleText}
						initial="initial"
						animate={wordRevealState > index ? 'animate' : ''}
						key={index}
						className="word inline-block"
					>
						{word.split('').map((char, index) => (
							<span key={index} className="inline-block">
								{char}
							</span>
						))}
						<span className="inline-block">&nbsp;</span>
					</motion.span>
				))}
			</span>
		</div>
	);
}

export default function StandaloneText({ data }: StandaloneTextProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.4, once: true });

	function textStyle(textStyle: string) {
		switch (textStyle) {
			case 'body':
				return 'text-body';
			case 'h4':
				return 'text-h4';
			case 'h3':
				return 'text-h3';
			case 'h2':
				return 'text-h2';
			case 'h2Large':
				return 'text-h2-large';
			case 'h1':
				return 'text-h1';
			default:
				return '';
		}
	}

	function alignment(alignment: string) {
		switch (alignment) {
			case '1':
				return 'col-start-1';
			case '2':
				return 'md:col-start-2 lg:col-start-2';
			case '3':
				return 'sm:col-start-2 md:col-start-2 lg:col-start-3';
			case '4':
				return 'sm:col-start-2 md:col-start-4 lg:col-start-4';
			case '6':
				return 'col-start-3 sm:col-start-3 md:col-start-4 lg:col-start-5 xl:col-start-6';
			default:
				return '';
		}
	}

	function width(width: string) {
		switch (width) {
			case 'w-5/12':
				return 'md:col-span-5';
			case 'w-6/12':
				return 'md:col-span-6';
			case 'w-7/12':
				return 'lg:col-span-7';
			case 'w-8/12':
				return 'md:col-span-10 lg:col-span-8';
			case 'w-9/12':
				return 'md:col-span-9';
			case 'w-10/12':
				return 'md:col-span-10';
			case 'w-12/12':
				return 'sm:col-span-12';
			default:
				return '';
		}
	}

	const CustomTag =
		data.useSimpleText && data.textOptions?.textType
			? (data.textOptions?.textType as keyof JSX.IntrinsicElements)
			: ('p' as keyof JSX.IntrinsicElements);

	return (
		<section
			ref={ref}
			className="contained mb-1.5 grid grid-cols-12 gap-2 sm:mb-3"
		>
			{!data.useSimpleText ? (
				<motion.div
					variants={textAnimation}
					initial="initial"
					animate={isInView ? 'animate' : 'initial'}
					className={`col-span-12 sm:col-span-10 ${width(
						data.positionOptions?.width
					)} ${alignment(data.positionOptions?.alignment)}`}
				>
					<RichText data={data.richText} />
				</motion.div>
			) : data.textAnimation == 'fadeIn' ? (
				<motion.div
					variants={textAnimation}
					initial="initial"
					animate={isInView ? 'animate' : 'initial'}
					className={`col-span-12 sm:col-span-10 ${width(
						data.positionOptions?.width
					)} ${alignment(
						data.positionOptions?.alignment
					)} ${textStyle(data.textOptions?.textStyle)} ${
						data.textOptions.centreAlignText ? 'text-center' : ''
					}`}
				>
					<CustomTag>{breakText(data.simpleText)}</CustomTag>
				</motion.div>
			) : data.textAnimation == 'scrollReveal' ? (
				<RevealOnScrollText
					text={data.simpleText}
					className={`col-span-12 sm:col-span-10 ${width(
						data.positionOptions?.width
					)} ${alignment(
						data.positionOptions?.alignment
					)} ${textStyle(data.textOptions?.textStyle)} ${
						data.textOptions.centreAlignText ? 'text-center' : ''
					}`}
				/>
			) : (
				<CustomTag
					className={`col-span-12 sm:col-span-10 ${width(
						data.positionOptions?.width
					)} ${alignment(
						data.positionOptions?.alignment
					)} ${textStyle(data.textOptions?.textStyle)} ${
						data.textOptions.centreAlignText ? 'text-center' : ''
					}`}
				>
					{breakText(data.simpleText)}
				</CustomTag>
			)}
		</section>
	);
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

const animateSimpleText = {
	initial: {
		opacity: 0.1,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
};
