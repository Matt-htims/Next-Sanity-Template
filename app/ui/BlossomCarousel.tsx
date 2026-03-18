'use client';
import { BlossomCarousel as BlossomCarouselWrapper } from '@blossom-carousel/react';
import '@blossom-carousel/core/style.css';
import { useWindowSize } from '@uidotdev/usehooks';

export default function BlossomCarousel({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { width } = useWindowSize();

	const containerWidth = 1564;

	const paddingDesktop = 40;
	const paddingMobile = 16;

	return (
		<BlossomCarouselWrapper
			className={className}
			style={{
				paddingLeft:
					width &&
					(width - (containerWidth + paddingDesktop * 2)) / 2 > 0
						? (width - containerWidth) / 2
						: width && width > 768
							? paddingDesktop
							: paddingMobile,

				paddingRight:
					width &&
					(width - (containerWidth + paddingDesktop * 2)) / 2 > 0
						? (width - containerWidth) / 2
						: width && width > 768
							? paddingDesktop
							: paddingMobile,
			}}
		>
			{children}
		</BlossomCarouselWrapper>
	);
}
