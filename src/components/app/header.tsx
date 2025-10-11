import { Link, useLocation } from '@tanstack/react-router';
import { type LucideIcon, SidebarOpen, SquareUser } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { pagesConfig } from '@/config/pages';
import { Button } from '../base/button';
import { Popover, PopoverContent, PopoverTrigger } from '../base/popover';
import { Sheet, SheetContent, SheetTrigger } from '../base/sheet';
import { PurchLogoSquare } from '../icons/purch-logo';
import { LogOutButtonDialog } from './log-out-button';
import { NavBar } from './navbar';

export const Header: FC = () => {
	const fullPath = useLocation().pathname;
	const atLandingPage = fullPath === '/landing';
	const currentPage = useLocation().pathname.split('/').at(-1);
	const config = (currentPage && pagesConfig.pages[currentPage]) ?? undefined;

	const buttonSize = 18 as const;

	useEffect(() => {
		console.log('page', currentPage);
	}, [currentPage]);

	return (
		<Sheet>
			<div className="sticky top-0 min-h-14 p-2 pl-3 pr-5 z-20 bg-background w-full border flex justify-between items-center">
				<div className="flex gap-5 items-center">
					<div className="min-w-13">
						{!atLandingPage && (
							<SheetTrigger className="">
								<SidebarOpen size={16} />
							</SheetTrigger>
						)}
					</div>
					<div className="mt-1 -ml-3">
						<Link to="/dashboard">
							<PurchLogoSquare size={29} color="black" />
						</Link>
					</div>
					<span className="logo-text font-bold text-xl -ml-1">
						{config ? config.display : ''}
					</span>
				</div>
				<div className="min-w-6">
					{!atLandingPage && (
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="ghost">
									<SquareUser size={buttonSize} />
								</Button>
							</PopoverTrigger>
							<PopoverContent side="bottom" asChild>
								<div className="flex flex-col w-fit gap-2 m-0">
									<Button size="sm" className="max-w-26" variant="ghost">
										<Link to="/settings" hash="account">
											<p className="text-xs">Settings</p>
										</Link>
									</Button>
									<LogOutButtonDialog />
								</div>
							</PopoverContent>
						</Popover>
					)}
				</div>
			</div>
			<NavBar />
		</Sheet>
	);
};
