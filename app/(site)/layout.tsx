import type { Metadata } from 'next';
import '../globals.css';
import { getSiteInfo, getSiteInfoMeta } from '@/sanity/sanity-utils';
import createMetadataObject from '@/lib/createMetadataObject';
import { siteFontClassName, siteFontHeadLinks } from '@/app/theme/_internal/fonts';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScrolling from '../components/SmoothScrolling';
import Providers from '../components/Providers';
import GoogleAnalytics from '../components/GoogleAnalytics';
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
				{siteFontHeadLinks.map((href) => (
					<link key={href} rel="stylesheet" href={href} />
				))}
			</head>
			<Providers>
				<body
					className={`relative -z-20 w-full overflow-x-clip bg-bg-canvas font-body text-text-primary antialiased transition-colors duration-1000 ease-in-out ${siteFontClassName}`}
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
