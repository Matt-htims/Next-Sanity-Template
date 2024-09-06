import { cn } from '@/lib/utils';

// Atoms / Blocks
import { Text } from '../atoms/Text';
import TextWithOptions from '../atoms/TextWithOptions';
import ButtonBlock from './ButtonBlock';

// Types
import { ButtonType } from '@/types/Button';
import { TextWithOptions as TextWithOptionsType } from '@/types/TextWithOptions';

export type TextStackType = {
	_key?: string;
	_type?: string;
	centered: boolean;
	pretitle: TextWithOptionsType;
	heading: TextWithOptionsType;
	body: TextWithOptionsType;
	buttons: ButtonType[];
};

type TextStackProps = {
	data: TextStackType;
};

export default function TextStack({ data }: TextStackProps) {
	return (
		<section
			className={cn('contained', {
				'flex justify-center text-center': data.centered,
			})}
		>
			<div
				className={cn('max-w-[940px]', {
					'ml-[calc(100%/12*1)]': !data.centered,
				})}
			>
				<TextWithOptions
					textWithOptions={data.pretitle}
					className="mb-3.5"
				/>
				<TextWithOptions
					textWithOptions={data.heading}
					className="mb-5"
				/>
				<TextWithOptions
					textWithOptions={data.body}
					className={cn('mb-12 max-w-2xl', {
						'mx-auto': data.centered,
					})}
				/>
				{data.buttons && (
					<ButtonBlock
						data={{ buttons: data.buttons }}
						className={cn({ 'justify-start': !data.centered })}
					/>
				)}
			</div>
		</section>
	);
}
