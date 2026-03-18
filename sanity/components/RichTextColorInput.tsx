import { Card, Flex, Grid, Stack, Text } from '@sanity/ui';
import { set, unset, type StringInputProps } from 'sanity';
import {
	richTextColorDefinitions,
	richTextColorStudioColorMap,
} from '@/app/theme/richTextColor';

export default function RichTextColorInput(props: StringInputProps) {
	const selectedValue = props.value as string | undefined;
	const selectedToken = richTextColorDefinitions.find(
		(token) => token.value === selectedValue,
	);
	const selectedPreviewColor = selectedToken
		? richTextColorStudioColorMap[selectedToken.value]
		: 'var(--semantic-text-primary)';
	const selectedPreviewLabel = selectedToken
		? selectedToken.title
		: 'Default';

	return (
		<Stack space={3}>
			<Grid columns={[1, 2]} gap={2}>
				<Card
					as="button"
					type="button"
					padding={3}
					radius={2}
					border
					tone={!selectedValue ? 'primary' : 'default'}
					onClick={() => {
						if (props.readOnly) return;
						props.onChange(unset());
					}}
					style={{
						cursor: props.readOnly ? 'not-allowed' : 'pointer',
						opacity: props.readOnly ? 0.6 : 1,
						textAlign: 'left',
						width: '100%',
					}}
				>
					<Flex align="center" gap={3}>
						<span
							aria-hidden="true"
							style={{
								backgroundColor: 'var(--semantic-text-primary)',
								border: '1px solid rgba(0, 0, 0, 0.14)',
								borderRadius: 999,
								display: 'inline-block',
								height: 14,
								width: 14,
								flexShrink: 0,
							}}
						/>
						<Stack space={1}>
							<Text size={1} weight="medium">
								Default
							</Text>
							<Text size={0} muted>
								No color override
							</Text>
						</Stack>
					</Flex>
				</Card>
				{richTextColorDefinitions.map((token) => {
					const isSelected = selectedValue === token.value;
					const previewColor =
						richTextColorStudioColorMap[token.value];

					return (
						<Card
							as="button"
							key={token.value}
							type="button"
							padding={3}
							radius={2}
							border
							tone={isSelected ? 'primary' : 'default'}
							onClick={() => {
								if (props.readOnly) return;
								props.onChange(
									isSelected ? unset() : set(token.value),
								);
							}}
							style={{
								cursor: props.readOnly
									? 'not-allowed'
									: 'pointer',
								opacity: props.readOnly ? 0.6 : 1,
								textAlign: 'left',
								width: '100%',
							}}
						>
							<Flex align="center" gap={3}>
								<span
									aria-hidden="true"
									style={{
										backgroundColor: previewColor,
										border: '1px solid rgba(0, 0, 0, 0.14)',
										borderRadius: 999,
										display: 'inline-block',
										height: 14,
										width: 14,
										flexShrink: 0,
									}}
								/>
								<Stack space={1}>
									<Text size={1} weight="medium">
										{token.title}
									</Text>
									<Text size={0} muted>
										{token.cssVar}
									</Text>
								</Stack>
							</Flex>
						</Card>
					);
				})}
			</Grid>
			{selectedPreviewColor && (
				<Card padding={3} radius={2} border>
					<Stack space={2}>
						<Text size={0} muted>
							Preview: {selectedPreviewLabel}
						</Text>
						<Text size={1} style={{ color: selectedPreviewColor }}>
							The quick brown fox jumps over the lazy dog.
						</Text>
					</Stack>
				</Card>
			)}
			<Text size={0} muted>
				Select a color token for editor preview and frontend rendering.
			</Text>
		</Stack>
	);
}
