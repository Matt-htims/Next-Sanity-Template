import { textVariants } from '@/app/components/atoms/Text';
import { textStyleType } from '@/app/theme/text';

export type TextWithOptions = {
	_type: string;
	text: string;
	textOptions: {
		textType: string;
		textStyle?: textStyleType;
	};
};
