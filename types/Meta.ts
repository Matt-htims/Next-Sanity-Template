import { ImageType } from './Image';

export type Meta = {
	seo: {
		_type: string;
		seoTitle: string;
		seoDescription: string;
	};
};

export type MetaSite = {
	seo: {
		_type: string;
		seoTitle: string;
		seoDescription: string;
		favicon: {
			_type: string;
			asset: {
				_id: string;
				_type: string;
				url: string;
			};
		};
		opengraphImage: ImageType;
	};
};
