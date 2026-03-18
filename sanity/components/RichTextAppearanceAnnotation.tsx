import {
	richTextColorStudioColorMap,
	richTextColorTitleMap,
	type RichTextColorToken,
} from '@/app/theme/richTextColor';

type AnnotationProps = {
	children?: React.ReactNode;
	renderDefault?: (props: AnnotationProps) => React.ReactNode;
	value?: {
		colorToken?: RichTextColorToken;
		textStyle?: string;
	};
};

export default function RichTextAppearanceAnnotation(props: AnnotationProps) {
	const token = props.value?.colorToken;
	const resolvedColor = token
		? richTextColorStudioColorMap[token]
		: undefined;
	const title = token ? richTextColorTitleMap[token] : undefined;
	const content = props.renderDefault
		? props.renderDefault(props)
		: props.children;

	if (!resolvedColor) {
		return <>{content}</>;
	}

	return (
		<span
			title={title}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 4,
			}}
		>
			<span
				aria-hidden="true"
				style={{
					backgroundColor: resolvedColor,
					borderRadius: 999,
					display: 'inline-block',
					height: 8,
					width: 8,
					flexShrink: 0,
				}}
			/>
			<span>{content}</span>
		</span>
	);
}
