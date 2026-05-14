import { buttonSizeType, buttonVariantType } from '@/app/theme/button';
import { LinkType } from './Link';

export type DropdownItemType = {
	_key?: string;
	link: LinkType;
};

export type ButtonType = {
	_type: string;
	link: LinkType;
	buttonVariant?: buttonVariantType;
	buttonSize?: buttonSizeType;
	dropdownItems?: DropdownItemType[];
};
