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
		| 'default'
		| 'primary'
		| 'secondary'
		| 'outline'
		| 'nav'
		| null
		| undefined;
	buttonSize?: 'default' | 'sm' | 'lg' | 'xs' | 'nav';
};

export type OldButtonType = {
	_type: string;
	url: string;
	newTab: boolean;
	buttonText: string;
	buttonType: string;
	buttonAnimation?: string;
};
