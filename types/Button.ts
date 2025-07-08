import { buttonSizeType, buttonVariantType } from '@/app/MasterButton';
import { LinkType } from './Link';

export type ButtonType = {
	_type: string;
	link: LinkType;
	buttonVariant?: buttonVariantType;
	buttonSize?: buttonSizeType;
};
