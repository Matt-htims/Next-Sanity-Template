import { cn } from '@/lib/utils';
import { ImageType } from '@/types/Image';
import Image from 'next/image';

export default function CustomImage({
	image,
	className,
	sizes,
	priority,
	loading,
}: {
	image: ImageType;
	className?: string;
	sizes?: string;
	priority?: boolean;
	loading?: 'eager' | 'lazy' | undefined;
}) {
	return (
		<Image
			src={image.asset.url}
			width={image.asset.metadata.dimensions?.width}
			height={image.asset.metadata.dimensions?.height}
			alt={image.alt ?? 'Image'}
			placeholder="blur"
			blurDataURL={image.asset.metadata.lqip}
			className={cn(className)}
			sizes={sizes}
			priority={priority}
			loading={loading}
		/>
	);
}
