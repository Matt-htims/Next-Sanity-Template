import { PortableText } from '@portabletext/react';

import { Text } from './Text';
import { CustomLink } from '../CustomLink';
import { richTextColorVarMap } from '@/app/theme/richTextColor';
import InnerLink from './InnerLink';

function getResolvedTextColor(value) {
	const token = value?.colorToken;
	if (token && richTextColorVarMap[token]) {
		return `var(${richTextColorVarMap[token]})`;
	}

	return value?.color?.value || value?.color;
}

function normalizePath(path) {
	if (!path) return null;
	return path.charAt(0) === '/' ? path : `/${path}`;
}

function resolveRichTextLink(value) {
	if (!value) return { href: null, isExternal: false };

	if (value?.href) {
		const href = value.href;
		return { href, isExternal: href.startsWith('http') };
	}

	if (value?.linkType === 'customLink') {
		const href = value?.externalLink || null;
		if (!href) return { href: null, isExternal: false };
		return {
			href,
			isExternal:
				href.startsWith('http') ||
				href.startsWith('mailto:') ||
				href.startsWith('tel:'),
		};
	}

	if (value?.linkType === 'anchorLinkCurrentPage') {
		if (!value?.anchorLink) return { href: null, isExternal: false };
		return { href: `#${value.anchorLink}`, isExternal: false };
	}

	if (value?.linkType === 'anchorLinkDifferentPage') {
		const slug = value?.page?.slug;
		const anchor = value?.anchorLink;
		if (!slug || !anchor) return { href: null, isExternal: false };
		return {
			href: `${normalizePath(slug)}#${anchor}`,
			isExternal: false,
		};
	}

	if (value?.linkType === 'default') {
		const slug = value?.page?.slug;
		if (!slug) return { href: null, isExternal: false };
		return { href: normalizePath(slug), isExternal: false };
	}

	const legacySlug = value?.slug?.current || value?.reference?.slug?.current;
	if (legacySlug) {
		return { href: normalizePath(legacySlug), isExternal: false };
	}

	return { href: null, isExternal: false };
}

const myPortableTextComponents = {
	marks: {
		richTextLink: ({ value, children }) => {
			if (value?.linkType === 'anchorLinkCurrentPage') {
				return (
					<InnerLink
						innerLinkData={value}
						noAnimation
						className="underline decoration-1"
					>
						{children}
					</InnerLink>
				);
			}

			const { href, isExternal } = resolveRichTextLink(value);

			if (!href) {
				return <span className="underline">{children}</span>;
			}

			if (isExternal) {
				return (
					<a
						className="underline"
						href={href}
						target="_blank"
						rel="noopener noreferrer nofollow"
					>
						{children}
					</a>
				);
			}

			return (
				<CustomLink href={href} className="underline decoration-1">
					{children}
				</CustomLink>
			);
		},
		link: ({ value, children }) =>
			myPortableTextComponents.marks.richTextLink({ value, children }),
		internalLink: ({ value, children }) => {
			const slug =
				value?.slug?.current || value?.reference?.slug?.current;
			if (!slug) return <span>{children}</span>;
			const href = `/${slug}`;
			return (
				<CustomLink href={href} className="underline decoration-1">
					{children}
				</CustomLink>
			);
		},
		textColor: ({ children, value }) => (
			<span style={{ color: value.value }}>{children}</span>
		),
		textAppearance: ({ children, value }) => {
			const color = getResolvedTextColor(value);
			const textStyle = value?.textStyle;

			if (textStyle) {
				return (
					<Text
						as="span"
						textStyle={textStyle}
						className="inline-block"
						style={color ? { color } : undefined}
					>
						{children}
					</Text>
				);
			}

			return (
				<span style={color ? { color } : undefined}>{children}</span>
			);
		},
		textStyle: ({ children, value }) => (
			<Text
				as="span"
				textStyle={value.textStyle}
				className="inline-block"
			>
				{children}
			</Text>
		),
	},

	list: {
		bullet: ({ children }) => (
			<ul className="list-outside list-disc space-y-2 pl-6 [&>li]:pl-3">
				<Text textStyle="body" className="space-y-3">
					{children}
				</Text>
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-outside list-decimal pl-6 md:pl-10">
				<Text textStyle="body" className="space-y-3">
					{children}
				</Text>
			</ol>
		),
	},

	block: {
		'display-h1': ({ children }) => (
			<Text as="p" textStyle="h1" className="text-pretty">
				{children}
			</Text>
		),
		'display-h2': ({ children }) => (
			<Text as="p" textStyle="h2" className="text-pretty">
				{children}
			</Text>
		),
		'display-h3': ({ children }) => (
			<Text as="p" textStyle="h3" className="text-pretty">
				{children}
			</Text>
		),
		'display-h4': ({ children }) => (
			<Text as="p" textStyle="h4" className="text-pretty">
				{children}
			</Text>
		),
		'display-h5': ({ children }) => (
			<Text as="p" textStyle="h5" className="text-pretty">
				{children}
			</Text>
		),
		'display-h6': ({ children }) => (
			<Text as="p" textStyle="h6" className="text-pretty">
				{children}
			</Text>
		),
		'display-body-small': ({ children }) => (
			<Text as="p" textStyle="body-small" className="text-pretty">
				{children}
			</Text>
		),
		h1: ({ children, value }) => (
			<Text as="h1" textStyle={!value.textStyle ? 'h1' : null}>
				{children}
			</Text>
		),
		h2: ({ children, value }) => (
			<Text as="h2" textStyle={!value.textStyle ? 'h2' : null}>
				{children}
			</Text>
		),
		h3: ({ children, value }) => (
			<Text as="h3" textStyle={!value.textStyle ? 'h3' : null}>
				{children}
			</Text>
		),
		h4: ({ children, value }) => (
			<Text as="h4" textStyle={!value.textStyle ? 'h4' : null}>
				{children}
			</Text>
		),
		h5: ({ children, value }) => (
			<Text as="h5" textStyle={!value.textStyle ? 'h5' : null}>
				{children}
			</Text>
		),
		normal: ({ children, value }) => (
			<Text
				as="p"
				textStyle={!value.textStyle ? 'body' : null}
				className="text-pretty"
			>
				{children}
			</Text>
		),
	},
};

export default function RichText({ data }) {
	return <PortableText value={data} components={myPortableTextComponents} />;
}
