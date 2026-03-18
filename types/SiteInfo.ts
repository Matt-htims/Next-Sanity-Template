import { ImageType } from './Image';
import { ButtonType } from './Button';

export type SiteLogo = {
	_type: string;
	textAsLogo: boolean;
	imageLogo?: ImageType;
	textLogo?: string;
};

export type BannerItemType = {
	bannerContent?: string;
	bannerLink?: string;
	bannerColour?: 'primary' | 'secondary';
};

export type SiteInfo = {
	_id: string;
	_createdAt: Date;
	siteName: string;
	siteLogo: SiteLogo;
	navMenu: Array<ButtonType>;
	addBanner: boolean;
	banner?: BannerItemType[];
};

export type SiteInfoProps = {
	data: SiteInfo;
};
