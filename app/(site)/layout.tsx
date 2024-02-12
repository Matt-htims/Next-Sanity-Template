import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.scss';
import { getSiteInfo, getSiteInfoMeta } from '@/sanity/sanity-utils';
import createMetadataObject from '../utils/createMetadataObject';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrolling from '../components/SmoothScrolling';

const FallbackSeo = {
	title: 'No meta sent',
	description: 'No meta sent',
};

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getSiteInfoMeta();

	if (!meta) return FallbackSeo;

	return createMetadataObject(meta);
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const siteInfo = await getSiteInfo();

	return (
		<html data-theme="light" lang="en">
			<head>
				{/* <Script
					async
					src="https://eu.umami.is/script.js"
					data-website-id="8d538029-7728-4485-81f1-4972e7bf67f2"
				/> */}
			</head>
			<body
				className={`font-inter relative -z-20 w-full overflow-x-clip bg-background transition-colors duration-1000 ease-in-out font-body text-text antialiased ${inter.variable}`}
			>
				<Navbar data={siteInfo} />
				{/* <InitialAnimation /> */}
				<main className="min-h-screen overflow-x-clip">
					<SmoothScrolling>{children}</SmoothScrolling>
					{/* {children} */}
				</main>
				<Footer data={siteInfo} />
			</body>
		</html>
	);
}
