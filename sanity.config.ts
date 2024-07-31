import {
	sanityProjectId,
	sanityDataset,
	sanityTitle,
	sanityApiVersion,
} from '@/sanityConfig';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import schemas from './sanity/schemas';
// import { dashboardTool } from '@sanity/dashboard';
// import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify';
import {
	VercelDeployConfig,
	vercelDeployTool,
} from 'sanity-plugin-vercel-deploy';
// import { visionTool } from '@sanity/vision';

import { simplerColorInput } from 'sanity-plugin-simpler-color-input';

import { ControlsIcon, DocumentsIcon } from '@sanity/icons';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

// Define the singleton document types
const singletonTypes = new Set(['siteInfo']);

const config = defineConfig({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	title: sanityTitle,
	apiVersion: sanityApiVersion,
	useCdn: false,
	basePath: '/admin',
	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						// Our singleton type has a list item with a custom child
						S.listItem()
							.title('Site Info')
							.id('siteInfo')
							.icon(ControlsIcon)
							.child(
								// Instead of rendering a list of documents, we render a single
								// document, specifying the `documentId` manually to ensure
								// that we're editing the single instance of the document
								S.document()
									.schemaType('siteInfo')
									.documentId('siteInfo'),
							),

						// Regular document types
						S.documentTypeListItem('page')
							.title('Pages')
							.icon(DocumentsIcon),
					]),
		}),
		media(),
		vercelDeployTool(),
		simplerColorInput({
			defaultEnableAlpha: true,
			defaultColorList: [
				{ label: 'Lush', value: '#446959' },
				{ label: 'Earth', value: '#E0D0B6' },
				{ label: 'Moss', value: '#AEBAA3' },
				{ label: 'Clay', value: '#C76647' },
				{ label: 'Wood', value: '#7C6252' },
			],
		}),
		// visionTool(),
	],
	schema: {
		types: schemas,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.has(schemaType),
			),
	},
	document: {
		// For singleton types, filter out actions that are not explicitly included
		// in the `singletonActions` list defined above
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(
						({ action }) => action && singletonActions.has(action),
					)
				: input,
	},
});

export default config;
