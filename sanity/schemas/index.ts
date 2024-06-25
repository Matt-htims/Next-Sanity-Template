import page from './documents/page-schema';
import pageIntro from './blocks/pageIntro-schema';
import standaloneText from './blocks/standaloneText-schema';
import seo from './misc/seo-schema';
import addressInfo from './misc/addressInfo-schema';
import siteInfo from './documents/siteInfo-schema';
import siteSeo from './misc/siteSeo-schema';
import siteLogo from './misc/siteLogo-schema';
import imageBlock from './blocks/imageBlock-schema';
import spacer from './blocks/spacer-schema';
import imageCarousel from './blocks/imageCarousel-schema';
import imageText from './blocks/imageText-schema';
import fadeExplainer from './blocks/fadeExplainer-schema';
import themeSwitch from './blocks/themeSwitch-schema';
import videoBlock from './blocks/videoBlock-schema';
import logoGrid from './blocks/logoGrid-schema';
import button from './misc/button-schema';
import textWithOptions from './misc/textWithOptions-schema';
import buttonBlock from './blocks/buttonBlock-schema';
import navItem from './misc/navItem-schema';

const miscSchemas = [
	seo,
	siteSeo,
	addressInfo,
	siteLogo,
	button,
	textWithOptions,
	navItem,
];

const blockSchemas = [
	pageIntro,
	standaloneText,
	spacer,
	imageBlock,
	imageCarousel,
	imageText,
	fadeExplainer,
	themeSwitch,
	videoBlock,
	logoGrid,
	buttonBlock,
];

const documentSchemas = [page, siteInfo];

const schemas = [...documentSchemas, ...blockSchemas, ...miscSchemas];

export default schemas;
