import { cn } from '@/lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';
import { Squircle } from 'corner-smoothing';

export default function CornerSmoothing({
	children,
	className,
	cornerRadius,
	noCornerSmoothing,
}: {
	children: React.ReactNode;
	className?: string;
	cornerRadius?: number;
	noCornerSmoothing?: boolean;
}) {
	const { width } = useWindowSize();
	if (noCornerSmoothing) {
		return <>{children}</>;
	}
	return (
		<Squircle
			style={{
				borderRadius: cornerRadius ?? (width && width < 600 ? 18 : 28),
			}}
			className={cn('overflow-hidden', className)}
			cornerRadius={cornerRadius ?? (width && width < 600 ? 18 : 28)}
		>
			{children}
		</Squircle>
	);
}
