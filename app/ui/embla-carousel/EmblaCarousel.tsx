'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

type PropType = {
	children?: React.ReactNode;
	className?: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { children, className } = props;
	const options: EmblaOptionsType = {
		align: 'start',
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<section className={cn('embla relative')}>
			<div className="embla__controls ml-auto w-max">
				<div className="embla__buttons mb-5 flex gap-5">
					<PrevButton
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
					/>
					<NextButton
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
					/>
				</div>
			</div>
			<div className="embla__viewport" ref={emblaRef}>
				<div className={cn('embla__container -ml-5 flex', className)}>
					{children}
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
