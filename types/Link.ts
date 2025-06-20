type MenuPageInfo = {
	_id: string;
	slug: string;
	name: string;
};

export type LinkType = {
	_type: string;
	linkType:
		| 'default'
		| 'customLink'
		| 'anchorLinkCurrentPage'
		| 'anchorLinkDifferentPage';
	externalLink?: string;
	page?: MenuPageInfo;
	pageTitle?: string;
	anchorLink?: string;
	displayName?: string;
};
