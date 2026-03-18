import { cn } from '@/lib/utils';
import { TextWithOptions as TextWithOptionsType } from '@/types/TextWithOptions';
import { Text } from './Text';

export default function TextWithOptions({
	textWithOptions,
	className,
}: {
	textWithOptions: TextWithOptionsType;
	className?: string;
}) {
	const textOptions = textWithOptions?.textOptions;

	return (
		<Text
			as={textOptions.textType}
			textStyle={textOptions.textStyle}
			className={cn(className)}
		>
			{textWithOptions?.text}
		</Text>
	);
}
