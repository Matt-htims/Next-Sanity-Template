import { RocketIcon } from '@sanity/icons';
import { Button, Card, Code, Flex, Stack, Text } from '@sanity/ui';
import { definePlugin } from 'sanity';
import { useState } from 'react';

const deployHookUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_DEPLOY_HOOK_URL;
const deployLabel =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_DEPLOY_LABEL ||
	'Deploy Production Site';

type DeployResponse = {
	job?: {
		id?: string;
		name?: string;
		state?: string;
		url?: string;
	};
	message?: string;
};

function VercelDeployTool() {
	const [isDeploying, setIsDeploying] = useState(false);
	const [status, setStatus] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);

	const handleDeploy = async () => {
		if (!deployHookUrl) {
			setError(
				'Missing NEXT_PUBLIC_SANITY_STUDIO_DEPLOY_HOOK_URL. Add your Vercel deploy hook URL to enable manual deploys from Studio.',
			);
			return;
		}

		setIsDeploying(true);
		setError(null);
		setStatus(null);
		setDeploymentUrl(null);

		try {
			const response = await fetch(deployHookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ triggeredFrom: 'sanity-studio' }),
			});

			const contentType = response.headers.get('content-type') || '';
			const payload: DeployResponse | null = contentType.includes(
				'application/json',
			)
				? await response.json()
				: null;

			if (!response.ok) {
				throw new Error(
					payload?.message ||
						'Vercel rejected the deploy request. Check the deploy hook and Vercel project settings.',
				);
			}

			setStatus(
				payload?.message ||
					payload?.job?.state ||
					'Deploy triggered successfully.',
			);
			setDeploymentUrl(payload?.job?.url || null);
		} catch (caughtError) {
			setError(
				caughtError instanceof Error
					? caughtError.message
					: 'Unable to trigger the deploy hook.',
			);
		} finally {
			setIsDeploying(false);
		}
	};

	return (
		<Flex align="center" height="fill" justify="center" padding={4}>
			<Card
				border
				padding={4}
				radius={3}
				shadow={1}
				style={{ maxWidth: 560, width: '100%' }}
			>
				<Stack space={4}>
					<Stack space={2}>
						<Text size={4} weight="semibold">
							Manual Deploy
						</Text>
						<Text muted size={2}>
							Trigger a Vercel deployment directly from Sanity
							Studio.
						</Text>
					</Stack>

					{deployHookUrl ? (
						<Text size={2}>
							Configured with:{' '}
							NEXT_PUBLIC_SANITY_STUDIO_DEPLOY_HOOK_URL
						</Text>
					) : (
						<Card border tone="caution" padding={3} radius={2}>
							<Text size={2}>
								Add NEXT_PUBLIC_SANITY_STUDIO_DEPLOY_HOOK_URL to
								enable this tool.
							</Text>
						</Card>
					)}

					<Button
						fontSize={2}
						icon={RocketIcon}
						mode="default"
						text={
							isDeploying ? 'Triggering deploy...' : deployLabel
						}
						tone="primary"
						onClick={handleDeploy}
						disabled={!deployHookUrl || isDeploying}
					/>

					{status ? (
						<Card border tone="positive" padding={3} radius={2}>
							<Stack space={3}>
								<Text size={2}>{status}</Text>
								{deploymentUrl ? (
									<Button
										as="a"
										href={deploymentUrl}
										target="_blank"
										rel="noreferrer"
										text="Open deployment"
										mode="ghost"
									/>
								) : null}
							</Stack>
						</Card>
					) : null}

					{error ? (
						<Card border tone="critical" padding={3} radius={2}>
							<Text size={2}>{error}</Text>
						</Card>
					) : null}
				</Stack>
			</Card>
		</Flex>
	);
}

export const vercelDeployTool = definePlugin({
	name: 'vercel-deploy-tool',
	tools: [
		{
			name: 'deploy',
			title: 'Deploy',
			icon: RocketIcon,
			component: VercelDeployTool,
		},
	],
});
