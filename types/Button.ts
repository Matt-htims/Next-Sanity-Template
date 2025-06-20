import { LinkType } from './Link';

type MenuPageInfo = {
	_id: string;
	slug: string;
	name: string;
};

export type ButtonType = {
	_type: string;
	link: LinkType;
	buttonType?:
		| 'default'
		| 'secondary'
		| 'outline'
		| 'link'
		| 'nav'
		| null
		| undefined;
	buttonSize?: 'default' | 'sm' | 'lg' | 'nav';
};
