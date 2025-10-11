import { Link } from '@tanstack/react-router';
import { pagesConfig } from '@/config/pages';
import { Separator } from '../base/separator';
import {
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
} from '../base/sheet';

export function NavBar() {
	return (
		<SheetContent side="left">
			<SheetHeader>
				<span className="logo-text font-bold text-xl ml-2">Purch</span>
			</SheetHeader>
			<div className="mx-4">
				<Separator className="w-8" />
			</div>
			<div className="flex flex-col gap-2 m-3">
				{Object.entries(pagesConfig.pages)
					.filter(([page, _]) => page !== 'landing')
					.map(([page, config]) => (
						<Link key={page} to={config.url}>
							<SheetClose className="w-full">
								<div className="flex items-center gap-3">
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
