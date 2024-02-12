// Takes params array and creates slug string
export function createSlug(slugArray: string[]) {
	return slugArray.toString().replace(/,/g, '/');
}

// Takes slug string and creates params array
export function createSlugArray(slugString: string) {
	if (slugString.charAt(0) === '/') {
		return slugString.substring(1).split('/');
	} else {
		return slugString.split('/');
	}
}

// Removes / at the start of a slug
export function sanitiseSlug(slugString: string) {
	if (slugString.charAt(0) === '/') {
		return slugString.substring(1);
	} else {
		return slugString;
	}
}
