'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonType } from '@/types/Button';
import { LinkType } from '@/types/Link';
import InnerLink from '../../atoms/InnerLink';

function getLinkLabel(link: LinkType): string {
	if (
		link.linkType === 'default' ||
		link.linkType === 'anchorLinkDifferentPage'
	) {
		return link.pageTitle ?? link.page?.name ?? '';
	}
	return link.displayName ?? '';
}

const triggerClass =
	'flex cursor-pointer select-none items-center font-bold text-[30px] leading-[34px] lg:text-[18px] lg:leading-[22px]';

export default function NavDropdownItem({
	button,
	mobile = false,
	onClose,
}: {
	button: ButtonType;
	mobile?: boolean;
	onClose?: () => void;
}) {
	const [open, setOpen] = useState(false);

	const chevron = (
		<motion.svg
			animate={{ rotate: open ? 180 : 0 }}
			transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
			className="ml-1.5 inline-block h-3.5 w-3.5 shrink-0"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M5 7.5L10 12.5L15 7.5"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</motion.svg>
	);

	const trigger = (
		<span className={triggerClass} onClick={() => setOpen((v) => !v)}>
			{getLinkLabel(button.link)}
			{chevron}
		</span>
	);

	if (mobile) {
		return (
			<div>
				{trigger}
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
							className="flex flex-col overflow-hidden pl-8"
						>
							{button.dropdownItems!.map((item, index) => (
								<div key={item._key ?? index} onClick={onClose}>
									<InnerLink
										innerLinkData={item.link}
										noAnimation
										className="block px-5 py-2 font-bold text-[24px] leading-[30px]"
									/>
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			{trigger}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
						className="absolute top-full left-1/2 z-50 w-max -translate-x-1/2 pt-3"
					>
						<div className="flex flex-col rounded-2xl bg-bg-canvas p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-text-primary">
							{button.dropdownItems!.map((item, index) => (
								<InnerLink
									key={item._key ?? index}
									innerLinkData={item.link}
									noAnimation
									className="block px-4 py-2 font-bold text-[18px] leading-[22px] transition-opacity hover:opacity-60"
								/>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
