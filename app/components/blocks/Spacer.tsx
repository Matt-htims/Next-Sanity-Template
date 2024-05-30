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
				return 'mt-1.5 sm:mt-2.5';
			case '20px':
				return 'mt-2.5 sm:mt-5';
			case '50px':
				return 'mt-6 sm:mt-12';
			case '100px':
				return 'mt-12 sm:mt-24';
			case '150px':
				return 'mt-20 sm:mt-36';
			case '200pxSm':
				return 'mt-20 sm:mt-28 md:mt-52';
			case '200px':
				return 'mt-32 sm:mt-52';
			case '250px':
				return 'mt-36 sm:mt-60';
			default:
				return '';
		}
	}
	return <div className={`${spacerSizeCalc(data.spacerSize)}`}></div>;
}
