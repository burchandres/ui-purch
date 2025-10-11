import { Link, useLocation } from '@tanstack/react-router';
import { type LucideIcon, SidebarOpen, SquareUser } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { pagesConfig } from '@/config/pages';
import { Button } from '../base/button';
import { Popover, PopoverContent, PopoverTrigger } from '../base/popover';
import { PurchLogoSquare } from '../icons/purch-logo';
import { LogOutButtonDialog } from './log-out-button';

export const Header: FC = () => {
	const fullPath = useLocation().pathname;
	const atLandingPage = fullPath === '/landing';
	const currentPage = useLocation().pathname.split('/').at(-1);
	const config = (currentPage && pagesConfig.pages[currentPage]) ?? undefined;

	useEffect(() => {
		console.log('page', currentPage);
	}, [currentPage]);

	return (
		<div className="sticky top-0 min-h-13 p-2 pl-5 pr-5 z-20 bg-background w-full border flex justify-between items-center">
			<div className="flex gap-5 items-center">
				<div className="min-w-10">
					{!atLandingPage && (
						<Button variant="ghost" size="icon">
							<SidebarOpen />
						</Button>
					)}
				</div>
				<div className="mt-1">
					<Link to="/">
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
							<Button variant="ghost" size="icon">
								<SquareUser />
							</Button>
						</PopoverTrigger>
						<PopoverContent side={'left'} asChild>
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
	);
};
