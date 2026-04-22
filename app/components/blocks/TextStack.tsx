'use client';
import { cn } from '@/lib/utils';

// Animation
import { motion, cubicBezier } from 'framer-motion';
import { animateContainer, animateChildUp } from '@/lib/animations';

// Atoms / Blocks
import ButtonBlock from './ButtonBlock';

// Types
import { ButtonType } from '@/types/Button';
import RichText from '../atoms/RichText';
import { ImageType } from '@/types/Image';
import CustomImage from '../atoms/CustomImage';
import CornerSmoothing from '../atoms/CornerSmoothing';
import type { FormDocumentType } from '@/types/Form';
import FormspreeForm from './forms/FormspreeForm';
import { getLayoutWidthClassName } from '@/lib/layoutWidth';
import { Container } from '../atoms/Container';

export type TextStackType = {
	_key?: string;
	_type?: string;
	id?: string;
	centered: boolean;
	maxWidth: string;
	pretitle: Array<any>;
	headingRich: Array<any>;
	bodyRich: Array<any>;
	buttons: ButtonType[];
	form?: FormDocumentType;
};

type TextStackProps = {
	data: TextStackType;
};

export default function TextStack({ data }: TextStackProps) {
	const widthClassName = getLayoutWidthClassName(data.maxWidth);

	return (
		<section
			id={data.id || undefined}
			className={cn('relative scroll-m-32')}
		>
			<Container>
				<motion.div
					variants={animateContainer}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					// className={cn('relative z-10 flex w-full justify-center', {
					// 	'relative z-10 flex w-full justify-center text-center':
					// 		data.centered,
					// })}
				>
					<div
						className={cn(
							'relative z-10 flex w-full justify-center',
							{
								'relative z-10 flex w-full justify-center text-center':
									data.centered,
							},
						)}
					>
						<motion.div
							initial={{ y: 0 }}
							whileInView={{
								y: 0,
								transition: {
									ease: 'circOut' as const,
									duration: 0.5,
								},
							}}
							viewport={{ once: false }}
							className={widthClassName}
						>
							<div>
								{data.pretitle && (
									<motion.div
										variants={animateChildUp}
										className="mb-3.5"
									>
										<RichText data={data.pretitle} />
									</motion.div>
								)}
								{data.headingRich && (
									<motion.div
										variants={animateChildUp}
										className="text-pretty"
									>
										<RichText data={data.headingRich} />
									</motion.div>
								)}
							</div>
							<div>
								{data.bodyRich && (
									<motion.div
										variants={animateChildUp}
										className="mt-5 space-y-5 text-pretty sm:mt-7 md:space-y-7"
									>
										<RichText data={data.bodyRich} />
									</motion.div>
								)}
								{data.form && (
									<motion.div
										variants={animateChildUp}
										className="mt-7"
									>
										<FormspreeForm form={data.form} />
									</motion.div>
								)}
								{data.buttons && (
									<ButtonBlock
										data={{ buttons: data.buttons }}
										className={cn('mt-7', {
											'items-start justify-start':
												!data.centered,
										})}
									/>
								)}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</Container>
		</section>
	);
}
