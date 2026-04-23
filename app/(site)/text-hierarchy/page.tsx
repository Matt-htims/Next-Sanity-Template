import { Text } from '@/app/components/atoms/Text';
import { Container } from '@/app/components/atoms/Container';
import { cn } from '@/lib/utils';
import { textStyles, type textStyleType } from '@/app/theme/text';
import {
	primitiveColourTokens,
	semanticColourTokens,
} from '@/app/theme/_internal/colours';
import type { ElementType } from 'react';

function formatTextStyleName(style: textStyleType) {
	return style
		.replace('-', ' ')
		.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getPreviewElement(style: textStyleType): ElementType {
	if (style === 'h1') {
		return 'h1';
	}
	if (style === 'h2') {
		return 'h2';
	}
	if (style === 'h3') {
		return 'h3';
	}
	if (style === 'h4') {
		return 'h4';
	}
	if (style === 'h5') {
		return 'h5';
	}
	if (style === 'h6') {
		return 'h6';
	}

	return 'p';
}

function getPreviewSample(style: textStyleType): string {
	if (style === 'nav') {
		return 'Navigation Label';
	}

	if (style === 'body-small') {
		return 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.';
	}

	if (style === 'body') {
		return 'Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.';
	}

	return 'Nullam Sem Consectetur';
}

export default function Page() {
	const styleKeys = Object.keys(textStyles) as textStyleType[];

	return (
		<Container className="my-28 max-w-5xl space-y-12">
			<Colours />

			<div className="space-y-6">
				<Text as="h1" textStyle="h1">
					Text Style Preview
				</Text>
				<Text
					as="p"
					textStyle="body-small"
					className="text-text-secondary"
				>
					This list is generated from textStyles in theme/text.ts.
					Adding or removing styles there automatically updates this
					page.
				</Text>
				<div className="space-y-6">
					{styleKeys.map((style) => {
						const PreviewElement = getPreviewElement(style);
						const previewSample = getPreviewSample(style);

						return (
							<div
								key={style}
								className="space-y-3 border-t border-border-subtle pt-6"
							>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
									<Text as="p" textStyle="h6">
										{formatTextStyleName(style)}
									</Text>
									<Text
										as="p"
										textStyle="body-small"
										className="text-text-secondary"
									>
										{textStyles[style]}
									</Text>
								</div>
								<Text as={PreviewElement} textStyle={style}>
									{previewSample}
								</Text>
							</div>
						);
					})}
				</div>
			</div>
		</Container>
	);
}

function Colours() {
	return (
		<div className="mb-14">
			<Text as="h1" textStyle="h1" className="mb-10">
				Colours
			</Text>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					Primitive Tokens
				</Text>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
					{primitiveColourTokens.map((token) => (
						<ColourSquare
							key={token}
							colourName={token}
							tokenType="primitive"
						/>
					))}
				</div>
			</div>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					Light Theme Semantic Tokens
				</Text>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
					{semanticColourTokens.map((token) => (
						<ColourSquare
							key={token}
							colourName={token}
							tokenType="semantic"
						/>
					))}
				</div>
			</div>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					Dark Theme Semantic Tokens
				</Text>
				<div
					data-theme="dark"
					className="rounded-site bg-bg-canvas"
				>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
						{semanticColourTokens.map((token) => (
							<ColourSquare
								key={token}
								colourName={token}
								tokenType="semantic"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function ColourSquare({
	colourName,
	tokenType,
}: {
	colourName: string;
	tokenType: 'primitive' | 'semantic';
}) {
	const cssVariableName =
		tokenType === 'primitive'
			? `--${colourName}`
			: `--semantic-${colourName}`;

	return (
		<div className="space-y-2">
			<div
				className={cn(
					'flex h-32 w-full min-w-32 items-end border border-border-subtle p-2',
				)}
				style={{ backgroundColor: `var(${cssVariableName})` }}
			>
				<Text
					as="p"
					textStyle="body-small"
					className="rounded bg-bg-canvas px-1.5 py-0.5 font-mono text-xs text-text-primary"
				>
					{cssVariableName}
				</Text>
			</div>
			<Text as="p" textStyle="h6" className="pt-2">
				{colourName}
			</Text>
		</div>
	);
}
