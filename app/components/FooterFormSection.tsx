import { SiteInfoProps } from '@/types/SiteInfo';
import { Container } from './atoms/Container';
import FormspreeForm from './blocks/forms/FormspreeForm';

export default function FooterFormSection({ data }: SiteInfoProps) {
	if (!data.footerForm) return null;

	return (
		<section className="bg-bg-surface py-16 md:py-24">
			<Container>
				<div className="mx-auto max-w-2xl">
					<FormspreeForm form={data.footerForm} />
				</div>
			</Container>
		</section>
	);
}
