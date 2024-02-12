export function textStyle(textStyle: string) {
	switch (textStyle) {
		case 'body':
			return 'text-body';
		case 'h4':
			return 'text-h4';
		case 'h3':
			return 'text-h3';
		case 'h2':
			return 'text-h2';
		case 'h2Large':
			return 'text-h2-large';
		case 'h1':
			return 'text-h1';
		default:
			return '';
	}
}

export function alignment(alignment: string) {
	switch (alignment) {
		case '1':
			return 'col-start-1';
		case '2':
			return 'md:col-start-2 lg:col-start-2';
		case '3':
			return 'sm:col-start-2 md:col-start-2 lg:col-start-3';
		case '4':
			return 'sm:col-start-2 md:col-start-4 lg:col-start-4';
		case '6':
			return 'col-start-3 sm:col-start-3 md:col-start-4 lg:col-start-5 xl:col-start-6';
		default:
			return '';
	}
}

export function width(width: string) {
	switch (width) {
		case 'w-5/12':
			return 'md:col-span-5';
		case 'w-6/12':
			return 'md:col-span-6';
		case 'w-7/12':
			return 'lg:col-span-7';
		case 'w-8/12':
			return 'md:col-span-10 lg:col-span-8';
		case 'w-9/12':
			return 'md:col-span-9';
		case 'w-10/12':
			return 'md:col-span-10';
		case 'w-12/12':
			return 'sm:col-span-12';
		default:
			return '';
	}
}
