import { cn } from '@/lib/utils';

type EmblaCarouselSlideProps = {
	children?: React.ReactNode;
	className?: string;
	slideWidth?: '1/4' | '1/3' | '1/2' | '1';
};

export default function EmblaCarouselSlide({
	children,
	className,
	slideWidth,
}: EmblaCarouselSlideProps) {
	return (
		<div
			className={cn(
				'min-w-0 flex-[0_0_33.333%] pl-5',
				{
					'flex-[0_0_25%]': slideWidth == '1/4',
					'flex-[0_0_50%]': slideWidth == '1/2',
					'flex-[0_0_100%]': slideWidth == '1',
				},
				className,
			)}
		>
			{children}
		</div>
	);
}
