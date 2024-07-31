import { PortableText } from '@portabletext/react';

import { Text } from './Text';

const myPortableTextComponents = {
	marks: {
		link: ({ value, children }) => {
			const target = (value?.href || '').startsWith('http')
				? '_blank'
				: undefined;
			return (
				<a
					href={value?.href}
					target={target}
					rel={target === '_blank' ? 'noindex nofollow' : ''}
				>
					{children}
				</a>
			);
		},
		textColor: ({ children, value }) => (
			<span style={{ color: value.value }}>{children}</span>
		),
		textStyle: ({ children, value }) => (
			<span className={`text-${value.textStyle}`}>{children}</span>
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
		normal: ({ children }) => (
			<Text as="p" textStyle="body">
				{children}
			</Text>
		),
	},
};

export default function RichText({ data }) {
	return <PortableText value={data} components={myPortableTextComponents} />;
}
