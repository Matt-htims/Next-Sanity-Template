import fs from 'node:fs';
import path from 'node:path';

const rootBlockVariableRegex = /--([a-z0-9-]+)\s*:/gi;
const semanticPrefix = 'semantic-';
const ignoredPrefixes = ['site-', 'font-'];

function extractThemeRootBlock(css: string) {
	const rootMatch = css.match(/:root\s*{([\s\S]*?)}/);
	return rootMatch?.[1] ?? '';
}

function extractVariables(rootBlock: string) {
	const variables = Array.from(
		rootBlock.matchAll(rootBlockVariableRegex),
	).map((match) => match[1]);

	return Array.from(new Set(variables));
}

function loadThemeVariables() {
	const themeCssPath = path.join(process.cwd(), 'app/theme/theme.css');
	const themeCss = fs.readFileSync(themeCssPath, 'utf8');
	const rootBlock = extractThemeRootBlock(themeCss);

	return extractVariables(rootBlock);
}

const themeVariables = loadThemeVariables();

export const primitiveColourTokens = themeVariables.filter(
	(variable) =>
		!variable.startsWith(semanticPrefix) &&
		!ignoredPrefixes.some((prefix) => variable.startsWith(prefix)),
);

export const semanticColourTokens = themeVariables
	.filter((variable) => variable.startsWith(semanticPrefix))
	.map((variable) => variable.replace(semanticPrefix, ''));
