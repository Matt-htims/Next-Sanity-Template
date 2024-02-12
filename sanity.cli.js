import { sanityProjectId, sanityDataset } from '@/sanityConfig';

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
	api: {
		projectId: sanityProjectId,
		dataset: sanityDataset,
	},
});
