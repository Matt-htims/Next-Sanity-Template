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
            siteName,
            addBanner,
            banner[] {
                bannerContent,
                bannerLink,
                bannerColour,
            },
            navMenu [] {
                    _type,
                    buttonVariant,
                    buttonSize,
                    link {
                        linkType,
                        displayName,
                        externalLink,
                        pageTitle,
                        anchorLink,
                        page-> {
                            _id,
                            "slug" : slug.current,
                            name,
                        },
                    },
                    dropdownItems[] {
                        _key,
                        link {
                            linkType,
                            displayName,
                            externalLink,
                            pageTitle,
                            anchorLink,
                            page-> {
                                _id,
                                "slug" : slug.current,
                                name,
                            },
                        },
                    },
                },
            siteLogo{
                _type,
                textAsLogo,
                textLogo,
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

const blockFields = groq`
    ...,
    pretitle[] {
        ...,
        markDefs[] {
            ...,
            page-> { "slug": slug.current, name, id }
        }
    },
    headingRich[] {
        ...,
        markDefs[] {
            ...,
            page-> { "slug": slug.current, name, id }
        }
    },
    bodyRich[] {
        ...,
        markDefs[] {
            ...,
            page-> { "slug": slug.current, name, id }
        }
    },
    richText[] {
        ...,
        markDefs[] {
            ...,
            page-> { "slug": slug.current, name, id }
        }
    },
    image {
        ...,
        asset-> {
            _id, _type, url,
            metadata { lqip, dimensions { width, height } }
        }
    },
    logos[] {
        ...,
        asset-> {
            _id, _type, url,
            metadata { lqip, dimensions { width, height } }
        }
    },
    buttons[] {
        ...,
        link {
            ...,
            page-> { "slug": slug.current, name, id }
        }
    },
    form-> {
        _id, title, formspreeFormId, submitLabel,
        successMessage, errorMessage,
        fields[] { ..., options[] }
    },
    images[] {
        ...,
        asset-> {
            _id, _type, url,
            metadata { lqip, dimensions { width, height } }
        }
    },
    imageTextPairs[] {
        ...,
        image {
            ...,
            asset-> {
                _id, _type, url,
                metadata { lqip, dimensions { width, height } }
            }
        }
    }
`;

export async function getPage(
	slug: string,
	options?: { preview?: boolean },
): Promise<Page> {
	const client = options?.preview
		? createClient({
				...clientConfig,
				token: process.env.SANITY_API_READ_TOKEN,
			})
		: createClient(clientConfig);
	return client.fetch(
		groq`*[_type == "page" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            content[] {
                ${blockFields},
                content[] {
                    ${blockFields}
                }
            },
        }`,
		{ slug },
		options?.preview ? { perspective: 'drafts' as const } : undefined,
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
