import { PortableText } from '@portabletext/react';

import { Text } from './Text';
import { CustomLink } from '../CustomLink';

const blogPortableTextComponents = {
	marks: {
		link: ({ value, children }) => {
			const target = (value?.href || '').startsWith('http')
				? '_blank'
				: undefined;
			return (
				<a
					className="underline"
					href={value?.href}
					target={target}
					rel={target === '_blank' ? 'noindex nofollow' : ''}
				>
					{children}
				</a>
			);
		},
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
		h1: ({ children }) => (
			<Text as="h1" textStyle="h1">
				{children}
			</Text>
		),
		h2: ({ children }) => (
			<Text as="h2" textStyle="h2">
				{children}
			</Text>
		),
		h3: ({ children }) => (
			<Text as="h3" textStyle="h3">
				{children}
			</Text>
		),
		h4: ({ children }) => (
			<Text as="h4" textStyle="h4">
				{children}
			</Text>
		),
		h5: ({ children }) => (
			<Text as="h5" textStyle="h5">
				{children}
			</Text>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-2 border-black/20 pl-4 italic">
				<Text as="p" textStyle="body" className="text-pretty">
					{children}
				</Text>
			</blockquote>
		),
		normal: ({ children }) => (
			<Text as="p" textStyle="body" className="text-pretty">
				{children}
			</Text>
		),
	},
};

export default function BlogRichText({ data }) {
	return (
		<PortableText value={data} components={blogPortableTextComponents} />
	);
}
