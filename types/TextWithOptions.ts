import { textVariants } from '@/app/components/atoms/Text';

export type TextWithOptions = {
	_type: string;
	text: string;
	textOptions: {
		textType: string;
		textStyle?:
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6'
			| 'body'
			| 'body-small';
		textCentered: boolean;
	};
};
