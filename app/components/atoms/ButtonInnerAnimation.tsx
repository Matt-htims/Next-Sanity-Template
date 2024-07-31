export default function ButtonInnerAnimation({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<span className="sr-only">{children}</span>
			<span aria-hidden className="relative inline-flex overflow-hidden">
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[150%] group-hover:skew-y-6">
					{children}
				</div>
				<div className="absolute translate-y-[150%] skew-y-6 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
					{children}
				</div>
			</span>
		</>
	);
}
