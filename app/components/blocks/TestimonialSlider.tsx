import EmblaCarousel from '@/app/ui/embla-carousel/EmblaCarousel';
import EmblaCarouselSlide from '@/app/ui/embla-carousel/EmblaCarouselSlide';
import { Text } from '../atoms/Text';

type TestimonialSliderProps = {
	data: {
		_key?: string;
		_type?: string;
		testimonials: {
			name: string;
			body: string;
		}[];
	};
};

export default function TestimonialSlider({ data }: TestimonialSliderProps) {
	return (
		<section className="contained">
			<EmblaCarousel>
				{data.testimonials.map((testimonial, index) => (
					<EmblaCarouselSlide slideWidth="1/3" key={index}>
						<div className="h-full space-y-5 rounded-site bg-offColor p-5 md:p-10">
							<Text as="p" textStyle="h5">
								{testimonial.name}
							</Text>
							<Text as="p" textStyle="body">
								{testimonial.body}
							</Text>
						</div>
					</EmblaCarouselSlide>
				))}
			</EmblaCarousel>
		</section>
	);
}
