import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { getSiteInfo, getSiteInfoMeta } from '@/sanity/sanity-utils';
import createMetadataObject from '../utils/createMetadataObject';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrolling from '../components/SmoothScrolling';
import Providers from '../components/Providers';
import GoogleAnalytics from '../components/atoms/GoogleAnalytics';
import PageWrapper from '../components/PageWrapper';

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
		<html lang="en" data-theme="light">
			{/* <GoogleAnalytics id=''/> */}
			<head>
				{/* <Script
					async
					src="https://eu.umami.is/script.js"
					data-website-id="8d538029-7728-4485-81f1-4972e7bf67f2"
				/> */}
			</head>
			<Providers>
				<body
					className={`font-inter relative -z-20 w-full overflow-x-clip bg-background font-body text-text antialiased transition-colors duration-1000 ease-in-out ${inter.variable}`}
				>
					<Navbar data={siteInfo} />
					<main className="min-h-screen overflow-x-clip">
						<SmoothScrolling>
							<PageWrapper>{children}</PageWrapper>
						</SmoothScrolling>
						{/* {children} */}
					</main>
					<Footer data={siteInfo} />
				</body>
			</Providers>
		</html>
	);
}
