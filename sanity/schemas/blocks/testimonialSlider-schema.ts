import { ArrowRightIcon, UserIcon } from '@sanity/icons';

const testimonialSlider = {
	name: 'TestimonialSlider',
	title: 'Testimonial Slider',
	type: 'object',
	icon: ArrowRightIcon,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Testimonial Slider',
			hidden: true,
		},
		{
			name: 'testimonials',
			title: 'Testimonials',
			type: 'array',
			of: [
				{
					name: 'testimonial',
					type: 'object',
					icon: UserIcon,
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
						},
						{
							name: 'body',
							title: 'Body',
							type: 'text',
							rows: 3,
						},
					],
				},
			],
		},
	],
};

export default testimonialSlider;
