import { Page } from '@/types/Page';
import { SiteInfo } from '@/types/SiteInfo';
import { Meta, MetaSite } from '@/types/Meta';
import { createClient, groq } from 'next-sanity';
import clientConfig from './config/client-config';

export async function getSiteInfo(): Promise<SiteInfo> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "siteInfo" && _id == 'siteInfo'][0]{
            _id,
            _createdAt,
            address,
            instaLink,
            facebookLink,
            twitterLink,
            bookingLink,
            siteName,
            navMenu [] {
                    ...,
                    page-> {
                        "slug" : slug.current,
                        name,
                        id,
                    },
                },
            siteLogo{
                ...,
                imageLogo{
                    _type,
                    alt,
                    asset->{
                        _type,
                        _id,
                        url,
                        metadata {
                                    lqip,
                                    dimensions {
                                        width,
                                        height,
                                    }
                                },
                    },
                }
            },
        }`,
	);
}

export async function getSiteInfoMeta(): Promise<MetaSite> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "siteInfo" && _id == 'siteInfo'][0]{
           seo {
            ...,
            favicon {
                ...,
                asset-> {
                    _type,
                    _id,
                    url
                },
            },
            opengraphImage {
                ...,
                asset-> {
                    _type,
                    _id,
                    url,
                }
            }
           }
        }`,
	);
}

export async function getPages(): Promise<Page[]> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "page"]{
            _id,
            _createdAt,
            "slug": slug.current,
            name,
        }`,
	);
}

export async function getPage(slug: string): Promise<Page> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "page" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            content[] {
                ...,
                projects[]-> {
                    ...,
                    image{
                        ...,
                        asset-> {
                            _id,
                            _type,
                            url,
                            metadata {
                                lqip,
                                dimensions {
                                    width,
                                    height,
                                }
                            },
                        },
                    },
                },
                image{
                    ...,
                    asset-> {
                        _id,
                        _type,
                        url,
                        metadata {
                            lqip,
                            dimensions {
                                    width,
                                    height,
                                }
                        },
                    },
                },
                logos[] {
                    ...,
                    asset-> {
                        _id,
                        _type,
                        url,
                        metadata {
                            lqip,
                            dimensions {
                                width,
                                height,
                            },
                        },
                    },
                },
                buttons [] {
                    ...,
                    page-> {
                        "slug" : slug.current,
                        name,
                        id,
                    },
                },
                images[] {
                    ...,
                    asset-> {
                        _id,
                        _type,
                        url,
                        metadata {
                            lqip,
                            dimensions {
                                width,
                                height,
                            },
                        },
                    },
                },
                priceOptions[]->,
                imageTextPairs[] {
                    ...,
                    image {
                        ...,
                        asset-> {
                        _id,
                        _type,
                        url,
                        metadata {
                            lqip,
                            dimensions {
                                width,
                                height,
                            },
                        },
                    },
                    }
                }
            },
        }`,
		{ slug },
	);
}

export async function getPageSeo(slug: string): Promise<Meta> {
	return createClient(clientConfig).fetch(
		groq`*[_type == "page" && slug.current == $slug][0]{
            seo
        }`,
		{ slug },
	);
}
