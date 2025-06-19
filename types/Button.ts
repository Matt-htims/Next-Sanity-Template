type MenuPageInfo = {
	_id: string;
	slug: string;
	name: string;
};

export type ButtonType = {
	_type: string;
	customLink: boolean;
	displayName?: string;
	link?: string;
	page?: MenuPageInfo;
	pageTitle?: string;
	buttonType?:
		| 'link'
		| 'primary'
		| 'secondary'
		| 'outline-solid'
		| 'nav'
		| null
		| undefined;
	buttonSize?: 'default' | 'sm' | 'lg' | 'xs' | 'nav';
};
