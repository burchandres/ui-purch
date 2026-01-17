import { Link } from '@tanstack/react-router';
import { appearanceConfig } from '@/config/appearance';
import { pagesConfig } from '@/config/pages';
import { Separator } from '../base/separator';
import {
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '../base/sheet';

export function NavBar() {
	return (
		<SheetContent side="left">
			<SheetHeader>
				<SheetTitle className="logo-text font-bold text-xl ml-2">
					Purch
				</SheetTitle>
			</SheetHeader>
			<div className="mx-4">
				<Separator className="w-8" />
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: appearanceConfig.smGap,
					margin: appearanceConfig.smGap,
				}}
			>
				{Object.entries(pagesConfig.pages)
					.filter(([page, _]) => page !== 'landing')
					.map(([page, config]) => (
						<Link key={page} to={config.url}>
							<SheetClose className="w-full">
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: appearanceConfig.smGap,
									}}
								>
									{config.icon && <config.icon size={16} />}
									<span className="navbar-item">{config.display}</span>
								</div>
							</SheetClose>
						</Link>
					))}
			</div>
			<SheetFooter className="items-center text-sm font-light">
				© 2025 Purch, Inc.
			</SheetFooter>
		</SheetContent>
	);
}
