type PaddingProps = {
	data: {
		_type: string;
		_key: string;
		title: string;
		spacerSize: string;
		mobileOnly: boolean;
	};
};

export default function Spacer({ data }: PaddingProps) {
	// With Height
	function spacerSizeCalc(padding: string) {
		switch (padding) {
			case '12px':
				return 'h-2 md:h-3';
			case '20px':
				return 'h-3 md:h-5';
			case '32px':
				return 'h-5 md:h-8';
			case '40px':
				return 'h-6 h-10';
			case '64px':
				return 'h-10 md:h-16';
			case '80px':
				return 'h-12 md:h-20';
			case '112px':
				return 'h-16 md:h-28';
			case '144px':
				return 'h-20 md:h-36';
			case '208px':
				return 'h-28 md:h-52';
			case '256px':
				return 'h-32 md:h-64';
			default:
				return '';
		}
	}
	// With Margin Top
	// function spacerSizeCalc(padding: string) {
	// 	switch (padding) {
	// 		case '12px':
	// 			return 'mt-2 md:mt-3';
	// 		case '20px':
	// 			return 'mt-3 md:mt-5';
	// 		case '32px':
	// 			return 'mt-5 md:mt-8';
	// 		case '40px':
	// 			return 'mt-6 mt-10';
	// 		case '64px':
	// 			return 'mt-10 md:mt-16';
	// 		case '80px':
	// 			return 'mt-12 md:mt-20';
	// 		case '112px':
	// 			return 'mt-16 md:mt-28';
	// 		case '144px':
	// 			return 'mt-20 md:mt-36';
	// 		case '208px':
	// 			return 'mt-28 md:mt-52';
	// 		case '256px':
	// 			return 'mt-32 md:mt-64';
	// 		default:
	// 			return '';
	// 	}
	// }
	return (
		<div
			className={`${spacerSizeCalc(data.spacerSize)} ${
				data.mobileOnly ? 'md:hidden' : ''
			}`}
		></div>
	);
}
