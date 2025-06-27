import { ImageType } from '@/types/Image';
import { getImageProps } from 'next/image';

// Image component to display different images for mobile and desktop
export default function ResponsiveImage({
	mobileImage,
	desktopImage,
}: {
	mobileImage: ImageType;
	desktopImage: ImageType;
}) {
	const common = { alt: 'Background Image', sizes: '100vw' };
	const {
		props: { srcSet: desktop },
	} = getImageProps({
		...common,
		width: desktopImage.asset.metadata.dimensions?.width,
		height: desktopImage.asset.metadata.dimensions?.height,
		quality: 80,
		src: desktopImage.asset.url,
	});
	const {
		props: { srcSet: mobile, ...rest },
	} = getImageProps({
		...common,
		width: mobileImage.asset.metadata.dimensions?.width,
		height: mobileImage.asset.metadata.dimensions?.height,
		quality: 70,
		src: mobileImage.asset.url,
	});
	return (
		<picture>
			<source media="(min-width: 620px)" srcSet={desktop} />
			<source media="(min-width: 500px)" srcSet={mobile} />
			<img
				fetchPriority="high"
				{...rest}
				className="relative z-30 -mt-px h-[calc(100%+1px)] w-full object-cover"
			/>
		</picture>
	);
}
