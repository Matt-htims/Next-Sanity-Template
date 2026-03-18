import EmblaCarousel from '@/app/ui/embla-carousel/EmblaCarousel';
import EmblaCarouselSlide from '@/app/ui/embla-carousel/EmblaCarouselSlide';
import { Text } from '../atoms/Text';
import CornerSmoothing from '../atoms/CornerSmoothing';
import { Container } from '../atoms/Container';

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
		<Container as="section">
			<EmblaCarousel>
				{data.testimonials.map((testimonial, index) => (
					<EmblaCarouselSlide slideWidth="1/3" key={index}>
						<CornerSmoothing className="h-full">
							<div className="h-full space-y-5 bg-bg-surface p-5 transition-all duration-1000 md:p-10">
								<Text as="p" textStyle="h5">
									{testimonial.name}
								</Text>
								<Text as="p" textStyle="body">
									{testimonial.body}
								</Text>
							</div>
						</CornerSmoothing>
					</EmblaCarouselSlide>
				))}
			</EmblaCarousel>
		</Container>
	);
}
