type PaddingProps = {
	data: {
		_type: string;
		_key: string;
		title: string;
		spacerSize: string;
	};
};

export default function Spacer({ data }: PaddingProps) {
	function spacerSizeCalc(padding: string) {
		switch (padding) {
			case '10px':
				return 'mt-0.5 sm:mt-1';
			case '20px':
				return 'mt-1 sm:mt-2';
			case '50px':
				return 'mt-2 sm:mt-5';
			case '100px':
				return 'mt-5 sm:mt-10';
			case '150px':
				return 'mt-7 sm:mt-15';
			case '200pxSm':
				return 'mt-8 sm:mt-12 md:mt-20';
			case '200px':
				return 'mt-15 sm:mt-20';
			case '250px':
				return 'mt-12 sm:mt-25';
			default:
				return '';
		}
	}
	return <div className={`${spacerSizeCalc(data.spacerSize)}`}></div>;
}
