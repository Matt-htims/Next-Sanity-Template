import React, {
	ComponentPropsWithRef,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;

	return (
		<button
			className="embla__button embla__button--prev group h-max w-max pt-px transition duration-300 disabled:pointer-events-none"
			type="button"
			{...restProps}
		>
			<svg
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
				className="h-10 w-10 md:h-max md:w-max"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					width="48"
					height="48"
					rx="24"
					fill="#EDEAE8"
					className="fill-cream group-hover:fill-offBlack transition-all duration-300"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M19.9184 24L26.6659 30.7476L28.0801 29.3333L22.7468 24L28.0801 18.6667L26.6659 17.2525L19.9184 24Z"
					fill="#171615"
					className="fill-black transition-all duration-300 group-hover:fill-white group-disabled:opacity-20"
				/>
			</svg>

			{children}
		</button>
	);
};

export const NextButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;

	return (
		<button
			className="embla__button embla__button--next group h-max w-max transition duration-300 disabled:pointer-events-none"
			type="button"
			{...restProps}
		>
			<svg
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
				className="h-10 w-10 md:h-max md:w-max"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					width="48"
					height="48"
					rx="24"
					fill="#EDEAE8"
					className="group-hover:fill-offBlack transition-all duration-300"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M28.0816 24L21.3341 17.2524L19.9199 18.6667L25.2532 24L19.9199 29.3333L21.3341 30.7475L28.0816 24Z"
					fill="#171615"
					className="fill-black transition-all duration-300 group-hover:fill-white group-disabled:opacity-20"
				/>
			</svg>
			{children}
		</button>
	);
};
