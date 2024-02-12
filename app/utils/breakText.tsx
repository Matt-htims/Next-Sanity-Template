export function breakText(text: string) {
	const brokenText = text?.split('/') ?? [];

	return brokenText.map((t, index) => (
		<span className="block" key={index}>
			{t}
		</span>
	));
}
