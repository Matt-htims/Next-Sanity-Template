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
	const CustomTag = textWithOptions?.textOptions?.textType
		? (textWithOptions?.textOptions
				?.textType as keyof JSX.IntrinsicElements)
		: ('p' as keyof JSX.IntrinsicElements);

	const textOptions = textWithOptions?.textOptions;

	return (
		<Text
			as={textOptions.textType}
			textStyle={textOptions.textStyle}
			className={cn(
				textOptions.textCentered ? 'text-center' : '',
				className,
			)}
		>
			{textWithOptions?.text}
		</Text>
	);
}
