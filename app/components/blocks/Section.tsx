import { sectionBgConfig, SectionBgValue } from '@/app/theme/sectionBg';
import BlockRenderer from '@/lib/BlockRenderer';

type SectionProps = {
	data: {
		_key?: string;
		backgroundColor?: SectionBgValue;
		content?: any[];
	};
};

export default function Section({ data }: SectionProps) {
	const config = data.backgroundColor
		? sectionBgConfig[data.backgroundColor]
		: null;

	return (
		<div
			className={config?.className}
			data-theme={config?.dark ? 'dark' : undefined}
		>
			{data.content?.map((block, index) => BlockRenderer(block, index))}
		</div>
	);
}
