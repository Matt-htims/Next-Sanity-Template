import page from './documents/page-schema';
import form from './documents/form-schema';
import pageIntro from './blocks/pageIntro-schema';
import standaloneText from './blocks/standaloneText-schema';
import seo from './misc/seo-schema';
import siteInfo from './documents/siteInfo-schema';
import siteSeo from './misc/siteSeo-schema';
import siteLogo from './misc/siteLogo-schema';
import imageBlock from './blocks/imageBlock-schema';
import spacer from './blocks/spacer-schema';
import imageCarousel from './blocks/imageCarousel-schema';
import imageText from './blocks/imageText-schema';
import themeSwitch from './blocks/themeSwitch-schema';
import videoBlock from './blocks/videoBlock-schema';
import logoGrid from './blocks/logoGrid-schema';
import button from './misc/button-schema';
import textWithOptions from './misc/textWithOptions-schema';
import buttonBlock from './blocks/buttonBlock-schema';
import textStack from './blocks/textStack-schema';
import richText from './misc/richText-schema';
import testimonialSlider from './blocks/testimonialSlider-schema';
import wireFrameBlock from './blocks/wireframeBlock-schema';
import section from './blocks/section-schema';
import navItem from './misc/NavItem-schema';
import link from './misc/link-schema';
import formField from './misc/formField-schema';
import blogRichText from './misc/blogRichText-schema';
import richTextLink from './misc/richTextLink-schema';

const miscSchemas = [
	seo,
	siteSeo,
	link,
	siteLogo,
	button,
	textWithOptions,
	navItem,
	richText,
	richTextLink,
	blogRichText,
	formField,
];

const blockSchemas = [
	wireFrameBlock,
	section,
	pageIntro,
	standaloneText,
	spacer,
	imageBlock,
	imageCarousel,
	imageText,
	themeSwitch,
	videoBlock,
	logoGrid,
	buttonBlock,
	textStack,
	testimonialSlider,
];

const documentSchemas = [page, siteInfo, form];

const schemas = [...documentSchemas, ...blockSchemas, ...miscSchemas];

export default schemas;
