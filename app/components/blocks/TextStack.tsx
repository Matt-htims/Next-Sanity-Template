'use client';
import { cn } from '@/lib/utils';

// Animation
import { motion, cubicBezier } from 'framer-motion';
import { animateContainer, animateChildUp } from '@/app/animations';

// Atoms / Blocks
import ButtonBlock from './ButtonBlock';

// Types
import { ButtonType } from '@/types/Button';
import RichText from '../atoms/RichText';
import { ImageType } from '@/types/Image';
import CustomImage from '../atoms/CustomImage';
import CornerSmoothing from '../atoms/CornerSmoothing';

export type TextStackType = {
	_key?: string;
	_type?: string;
	id: string;
	centered: boolean;
	maxWidth: string;
	pretitle: Array<any>;
	headingRich: Array<any>;
	bodyRich: Array<any>;
	buttons: ButtonType[];
	addImage: boolean;
	image?: ImageType;
};

type TextStackProps = {
	data: TextStackType;
};

export default function TextStack({ data }: TextStackProps) {
	return (
		<section id={data.id} className={cn('relative scroll-m-32')}>
			{data.addImage && data.image && (
				<motion.div
					variants={animateChildUp}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					className="lg:contained relative z-0"
				>
					<CornerSmoothing className="h-full w-full">
						<CustomImage
							image={data.image}
							className="aspect-square w-full object-cover lg:aspect-[26/15] lg:rounded-site"
						/>
					</CornerSmoothing>
				</motion.div>
			)}
			<div className="contained">
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
					<CornerSmoothing
						noCornerSmoothing={data.maxWidth !== 'boxed'}
						className={cn(
							'relative z-10 flex w-full justify-center',
							{
								'relative z-10 flex w-full justify-center text-center':
									data.centered,
								'mx-auto md:w-10/12 lg:w-full xl:w-max':
									data.maxWidth == 'boxed',
							},
						)}
					>
						<motion.div
							initial={
								data.addImage && data.image
									? { y: 100 }
									: { y: 0 }
							}
							whileInView={{
								y: 0,
								transition: { ease: 'circOut', duration: 0.5 },
							}}
							viewport={{ once: false }}
							className={cn(
								'mx-auto max-w-[940px]',
								{
									'max-w-[676px] md:w-9/12 lg:w-10/12':
										data.maxWidth === 'six',
								},
								{
									'max-w-[912px] md:w-10/12':
										data.maxWidth === 'seven',
								},
								{
									'max-w-[1036px] md:w-10/12':
										data.maxWidth === 'eight',
								},
								{
									'max-w-[1200px] rounded-site bg-white px-7 py-16 md:px-14 md:py-28 lg:px-36 lg:py-28':
										data.maxWidth === 'boxed',
								},
								// {
								// 	'ml-[calc(100%/12*1)]': !data.centered,
								// },
								{
									'mx-auto flex max-w-full flex-col gap-5 md:w-10/12 xl:max-w-max xl:flex-row':
										data.maxWidth == 'sideBySide',
								},
								{
									'-mt-[82px] rounded-[28px] bg-white px-3 pt-10 md:-mt-18 md:rounded-[36px] md:px-14 md:pt-14 lg:-mt-28 lg:box-content lg:px-33 lg:pt-28':
										data.addImage && data.image,
								},
							)}
						>
							<div
								className={cn({
									'md:max-w-[640px] xl:w-1/2 xl:max-w-max':
										data.maxWidth == 'sideBySide',
								})}
							>
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
							<div
								className={cn({
									'ml-auto md:max-w-[640px] xl:mt-[360px] xl:w-1/2 xl:max-w-max':
										data.maxWidth == 'sideBySide',
								})}
							>
								{data.bodyRich && (
									<motion.div
										variants={animateChildUp}
										className="mt-5 space-y-5 text-pretty sm:mt-7 md:space-y-7"
									>
										<RichText data={data.bodyRich} />
									</motion.div>
								)}
								{/* <TextWithOptions
					textWithOptions={data.heading}
					className=""
				/>
				<TextWithOptions
					textWithOptions={data.body}
					className={cn('mt-7 max-w-2xl', {
						'mx-auto': data.centered,
					})}
				/> */}
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
					</CornerSmoothing>
				</motion.div>
			</div>
		</section>
	);
}
