import { Text } from '@/app/components/atoms/Text';
import { cn } from '@/lib/utils';

export default function Page() {
	return (
		<div className="contained my-28 max-w-5xl space-y-3">
			<Colours />
			<Text as="h1" textStyle="h1">
				Nullam Sem Consectetur
			</Text>
			<Text as="p" textStyle="body">
				Etiam porta sem malesuada magna mollis euismod. Maecenas sed
				diam eget risus varius blandit sit amet non magna. Maecenas sed
				diam eget risus varius blandit sit amet non magna. Vestibulum id
				ligula porta felis euismod semper.
			</Text>
			<Text as="p" textStyle="body">
				Nullam quis risus eget urna mollis ornare vel eu leo. Donec
				ullamcorper nulla non metus auctor fringilla. Nulla vitae elit
				libero, a pharetra augue. Donec id elit non mi porta gravida at
				eget metus. Integer posuere erat a ante venenatis dapibus
				posuere velit aliquet. Integer posuere erat a ante venenatis
				dapibus posuere velit aliquet.
			</Text>
			<Text as="h2" textStyle="h2" className="pt-6">
				Vulputate Bibendum Egestas
			</Text>
			<Text as="p" textStyle="body-small">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
				eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue
				laoreet rutrum faucibus dolor auctor. Integer posuere erat a
				ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
				porta ac consectetur ac, vestibulum at eros. Maecenas sed diam
				eget risus varius blandit sit amet non magna. Donec id elit non
				mi porta gravida at eget metus. Integer posuere erat a ante
				venenatis dapibus posuere velit aliquet.
			</Text>
			<Text as="h3" textStyle="h3" className="pt-6">
				Quam Ridiculus Egestas Ligula Cursus
			</Text>
			<Text as="p" textStyle="body">
				Etiam porta sem malesuada magna mollis euismod. Maecenas sed
				diam eget risus varius blandit sit amet non magna. Maecenas sed
				diam eget risus varius blandit sit amet non magna. Vestibulum id
				ligula porta felis euismod semper.
			</Text>
			<Text as="p" textStyle="body">
				Nullam quis risus eget urna mollis ornare vel eu leo. Donec
				ullamcorper nulla non metus auctor fringilla. Nulla vitae elit
				libero, a pharetra augue. Donec id elit non mi porta gravida at
				eget metus. Integer posuere erat a ante venenatis dapibus
				posuere velit aliquet. Integer posuere erat a ante venenatis
				dapibus posuere velit aliquet.
			</Text>
			<Text as="h4" textStyle="h4" className="pt-6">
				Aenean lacinia bibendum nulla sed consectetur.
			</Text>
			<Text as="p" textStyle="body-small">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
				eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue
				laoreet rutrum faucibus dolor auctor. Integer posuere erat a
				ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
				porta ac consectetur ac, vestibulum at eros. Maecenas sed diam
				eget risus varius blandit sit amet non magna. Donec id elit non
				mi porta gravida at eget metus. Integer posuere erat a ante
				venenatis dapibus posuere velit aliquet.
			</Text>
			<Text as="h5" textStyle="h5" className="pt-6">
				Nullam Sem Consectetur
			</Text>
			<Text as="p" textStyle="body">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
				eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue
				laoreet rutrum faucibus dolor auctor. Integer posuere erat a
				ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
				porta ac consectetur ac, vestibulum at eros. Maecenas sed diam
				eget risus varius blandit sit amet non magna. Donec id elit non
				mi porta gravida at eget metus. Integer posuere erat a ante
				venenatis dapibus posuere velit aliquet.
			</Text>
			<Text as="h6" textStyle="h6" className="pt-6">
				Nullam Sem Consectetur
			</Text>
			<Text as="p" textStyle="body-small">
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
				eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue
				laoreet rutrum faucibus dolor auctor. Integer posuere erat a
				ante venenatis dapibus posuere velit aliquet. Morbi leo risus,
				porta ac consectetur ac, vestibulum at eros. Maecenas sed diam
				eget risus varius blandit sit amet non magna. Donec id elit non
				mi porta gravida at eget metus. Integer posuere erat a ante
				venenatis dapibus posuere velit aliquet.
			</Text>
		</div>
	);
}

function Colours() {
	return (
		<div className="mb-14">
			<Text as="h1" textStyle="h1" className="mb-10">
				Colours
			</Text>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					All Colours
				</Text>
				<div className="flex justify-between">
					<ColourSquare colourName="white" />
					<ColourSquare
						colourName="offWhite"
						className="bg-offWhite"
					/>
					<ColourSquare colourName="black" />
					<ColourSquare colourName="offBlack" />
					<ColourSquare colourName="primary" />
					<ColourSquare
						colourName="secondary"
						className="bg-secondary"
					/>
				</div>
			</div>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					Light Theme Colours
				</Text>
				<div className="flex justify-between">
					<ColourSquare colourName="background" />
					<ColourSquare colourName="offColor" />
					<ColourSquare colourName="text" className="bg-black" />
				</div>
			</div>
			<div className="space-y-5 pb-14">
				<Text as="h2" textStyle="h5">
					Dark Theme Colours
				</Text>
				<div className="flex justify-between">
					<ColourSquare
						colourName="background"
						className="bg-black"
					/>
					<ColourSquare
						colourName="offColor"
						className="bg-offBlack"
					/>
					<ColourSquare colourName="text" className="bg-white" />
				</div>
			</div>
		</div>
	);
}

function ColourSquare({
	colourName,
	className,
}: {
	colourName: string;
	className?: string;
}) {
	return (
		<div>
			<div
				className={cn(
					'h-32 w-32 border border-black',
					'bg-' + colourName,
					className,
				)}
			></div>
			<Text as="p" textStyle="h6" className="pt-2">
				{colourName}
			</Text>
		</div>
	);
}
