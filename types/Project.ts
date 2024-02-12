import { ImageType } from './Image';

export type Project = {
	_type: string;
	_id: string;
	_rev: string;
	name: string;
	location: string;
	link: string;
	image: ImageType;
};
