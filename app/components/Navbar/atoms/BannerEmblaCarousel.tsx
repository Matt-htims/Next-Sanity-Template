import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

type PropType = {
	children?: React.ReactNode;
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { children, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ delay: 8000 }),
	]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	return (
		<section className="embla relative">
			<div className="embla__viewport overflow-hidden" ref={emblaRef}>
				<div className="embla__container flex h-10 flex-col md:h-[62px]">
					{children}
				</div>
			</div>

			<div className="embla__controls absolute top-0 bottom-0 left-0 flex flex-col justify-center">
				<div className="embla__dots ml-2.5 flex flex-col gap-1 md:ml-5">
					{scrollSnaps.length > 1 &&
						scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={cn(
									'embla__dot text- h-1 w-1 rounded-full bg-white opacity-20 transition duration-300',
									{
										'opacity-100': index === selectedIndex,
									},
								)}
							/>
						))}
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
