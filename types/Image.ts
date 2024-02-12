export type ImageType = {
	_type: string;
	alt: string;
	carouselSize?: string;
	asset: {
		_id: string;
		_type: string;
		url: string;
		metadata: {
			lqip: string;
			dimensions?: {
				width: number;
				height: number;
			};
		};
	};
};
