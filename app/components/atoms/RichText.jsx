import { PortableText } from '@portabletext/react';

import { Text } from './Text';
import { CustomLink } from '../CustomLink';

const myPortableTextComponents = {
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
			const { slug = {} } = value;
			const href = `/${slug.current}`;
			return (
				<CustomLink href={href} className="underline decoration-1">
					{children}
				</CustomLink>
			);
		},
		textColor: ({ children, value }) => (
			<span style={{ color: value.value }}>{children}</span>
		),
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
