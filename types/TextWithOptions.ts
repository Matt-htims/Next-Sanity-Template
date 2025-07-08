import { textVariants } from '@/app/components/atoms/Text';
import { textStyleType } from '@/app/MasterText';

export type TextWithOptions = {
	_type: string;
	text: string;
	textOptions: {
		textType: string;
		textStyle?: textStyleType;
		textCentered: boolean;
	};
};
