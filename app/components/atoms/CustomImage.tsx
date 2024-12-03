import { ImageType } from '@/types/Image';
import Image from 'next/image';

export default function CustomImage({
	image,
	className,
	sizes,
}: {
	image: ImageType;
	className?: string;
	sizes?: string;
}) {
	return (
		<Image
			src={image.asset.url}
			width={image.asset.metadata.dimensions?.width}
			height={image.asset.metadata.dimensions?.height}
			alt={image.alt ?? 'Image'}
			placeholder="blur"
			blurDataURL={image.asset.metadata.lqip}
			className={className}
			sizes={sizes}
		/>
	);
}
