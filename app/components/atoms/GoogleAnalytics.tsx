import Script from 'next/script';

const GoogleAnalytics = ({ id }: { id: string }) => {
	return (
		<>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
			/>

			<Script id="">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', ${id});
          `}
			</Script>
		</>
	);
};

export default GoogleAnalytics;
