import { cn } from '@/lib/utils';
import { Text } from '../atoms/Text';

type WireframeBlockProps = {
	data: {
		_key?: string;
		_type?: string;
		blockName: string;
		description?: string;
		blockSize?: string;
	};
};

export default function WireframeBlock({ data }: WireframeBlockProps) {
	function blockSize(blockSize: string | undefined) {
		switch (blockSize) {
			case '50vh':
				return 'h-[50vh]';
			case '25vh':
				return 'h-[25vh]';
			case '75vh':
				return 'h-[75vh]';
			case '100vh':
				return 'h-screen';
			default:
				return 'h-[50vh]';
		}
	}
	return (
		<section
			className={cn(
				'flex items-center justify-center border border-b border-t border-text text-center',
				blockSize(data.blockSize),
			)}
		>
			<div className="max-w-3xl">
				<Text as="h2" textStyle="h2" className="mb-10">
					{data.blockName}
				</Text>
				<Text>{data.description}</Text>
			</div>
		</section>
	);
}
