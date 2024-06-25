import { ImageType } from './Image';
import { ButtonType } from './Button';

type MenuPageInfo = {
	_id: string;
	slug: string;
	name: string;
};

type SiteLogo = {
	_type: string;
	textAsLogo: boolean;
	imageLogo?: ImageType;
	textLogo?: string;
};

export type MenuItem = {
	customLink: boolean;
	displayName?: string;
	link?: string;
	addSubpages: boolean;
	page?: MenuPageInfo;
	subPages?: Array<MenuPageInfo>;
};

export type AddressType = {
	_type: string;
	addressLine1: string;
	addressLine2: string;
	email: string;
	phoneNumber1: string;
	phoneNumber2: string;
};

export type SiteInfo = {
	_id: string;
	_createdAt: Date;
	siteName: string;
	siteLogo: SiteLogo;
	address: AddressType;
	instaLink: string;
	facebookLink: string;
	twitterLink: string;
	bookingLink: ButtonType;
	navMenu: Array<ButtonType>;
};

export type SiteInfoProps = {
	data: SiteInfo;
};
