export default function Honeypot({ name = '_gotcha' }: { name?: string }) {
	return (
		<div
			style={{
				position: 'absolute',
				left: '-9999px',
				top: 'auto',
				width: '1px',
				height: '1px',
				overflow: 'hidden',
			}}
			aria-hidden="true"
		>
			<label htmlFor={name}>Leave this field empty</label>
			<input
				type="text"
				name={name}
				id={name}
				tabIndex={-1}
				autoComplete="off"
			/>
		</div>
	);
}
