import { PortableText } from '@portabletext/react';

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
		h1: ({ children }) => <h1 className="text-h1">{children}</h1>,
		h2: ({ children }) => <h2 className="text-h2">{children}</h2>,
		h3: ({ children }) => <h3 className="text-h3">{children}</h3>,
		h4: ({ children }) => <h4 className="text-h4">{children}</h4>,
		h5: ({ children }) => <h5 className="text-h5">{children}</h5>,
		normal: ({ children }) => <p className="text-body">{children}</p>,
	},
};

export default function RichText({ data }) {
	return <PortableText value={data} components={myPortableTextComponents} />;
}
