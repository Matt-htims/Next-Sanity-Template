import Link from 'next/link';
import { motion } from 'framer-motion';

import { OldButtonType } from '@/types/Button';

type ButtonProps = {
	button: OldButtonType;
	onClickFunction?: any;
};

function renderButtonStyle(type: string) {
	switch (type) {
		case 'primary':
			return 'text-sm sm:text-lg md:text-xl leading-none font-eventide font-normal rounded-[5px] bg-clay px-2 pb-[14.5px] pt-[16px] sm:pb-[14px] sm:pt-[17px] uppercase text-dust transition duration-300';
		case 'secondary':
			return 'px-8 py-3 text-lg font-semibold rounded bg-secondary border-gray';
		case 'accent':
			return 'px-8 py-3 text-lg font-semibold rounded bg-accent border-gray';
		case 'cta':
			return 'px-8 py-3 text-lg font-semibold rounded bg-cta border-gray';
		case 'outline':
			return 'px-8 py-3 text-lg font-semibold border rounded border-gray';
		case 'xl':
			return 'px-10 py-5 text-h3 rounded-full bg-accent text-alwaysBlack';
		default:
			return 'px-8 py-3 text-lg font-semibold rounded bg-primary text-black ';
	}
}

export default function Button({ button, onClickFunction }: ButtonProps) {
	if (
		button?.buttonAnimation &&
		button?.buttonAnimation == 'button-text-reveal'
	) {
		if (onClickFunction) {
			return (
				<div
					onClick={onClickFunction}
					className={`button-text-reveal block w-max cursor-pointer ${renderButtonStyle(
						button.buttonType,
					)}`}
				>
					<span className="sr-only">{button.buttonText}</span>
					<span
						aria-hidden
						className="button-text-wrap inline-block leading-none"
					>
						{button.buttonText.split('').map((char, index) => {
							if (char == ' ') {
								return (
									<span key={index} className="inline-block">
										&nbsp;
									</span>
								);
							} else {
								return (
									<span
										key={index}
										className="button-letter inline-block"
									>
										{char}
									</span>
								);
							}
						})}
					</span>
				</div>
			);
		} else {
			return (
				<Link
					href={button.url}
					target={button.newTab ? '_blank' : '_self'}
					rel={button.newTab ? 'noindex nofollow' : ''}
					className={`button-text-reveal block w-max ${renderButtonStyle(
						button.buttonType,
					)}`}
				>
					<span className="sr-only">{button.buttonText}</span>
					<span
						aria-hidden
						className="button-text-wrap inline-block leading-none"
					>
						{button.buttonText.split('').map((char, index) => {
							if (char == ' ') {
								return (
									<span key={index} className="inline-block">
										&nbsp;
									</span>
								);
							} else {
								return (
									<span
										key={index}
										className="button-letter inline-block"
									>
										{char}
									</span>
								);
							}
						})}
					</span>
				</Link>
			);
		}
	} else {
		return (
			<Link
				href={button.url}
				target={button.newTab ? '_blank' : '_self'}
				rel={button.newTab ? 'noindex nofollow' : ''}
				className={`block w-max ${renderButtonStyle(
					button.buttonType,
				)}`}
			>
				{button.buttonText}
			</Link>
		);
	}
}
