import { Link, useLocation } from '@tanstack/react-router';
import { PanelLeftClose, SquareUser } from 'lucide-react';
import { Button } from '@/components/base/button';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	useSidebar,
} from '@/components/base/sidebar';
import { PurchLogoSquare, PurchLogoText } from '@/components/icons/purch-logo';
import { pagesConfig } from '@/config/pages';
import { Popover, PopoverContent, PopoverTrigger } from '../base/popover';
import { LogOutButtonDialog } from './log-out-button';

export function NavBar() {
	const { open, isMobile, openMobile, toggleSidebar } = useSidebar();
	const location = useLocation();

	const openOrMobile = open || (isMobile && openMobile);

	return (
		<Sidebar
			collapsible="icon"
			onClick={(e) => {
				if (!(e.target as HTMLElement).closest('button') && !openOrMobile)
					toggleSidebar();
			}}
		>
			<SidebarHeader>
				{openOrMobile ? (
					<div className="flex ml-1 mt-2 justify-between items-center">
						<Link to="/">
							<PurchLogoText />
						</Link>
						<Button size="sm" variant="ghost" onClick={toggleSidebar}>
							<PanelLeftClose />
						</Button>
					</div>
				) : (
					<Link to="/">
						<div className="flex ml-1 items-center mt-2 h-8">
							<PurchLogoSquare color="black" size="27" />
						</div>
					</Link>
				)}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{Object.entries(pagesConfig.pages).map(([page, config]) => (
							<Link
								key={page}
								to={location.pathname === config.url ? undefined : config.url}
								className="navbar-item"
							>
								<SidebarMenuButton
									tooltip={!openOrMobile ? config.display : ''}
								>
									{config.icon && <config.icon />}
									<span className="navbar-item">{config.display}</span>
								</SidebarMenuButton>
							</Link>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Popover>
					<PopoverTrigger asChild>
						<SidebarMenuButton tooltip="Account">
							<SquareUser />
							Account
						</SidebarMenuButton>
					</PopoverTrigger>
					<PopoverContent side={openOrMobile ? 'top' : 'right'} asChild>
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
			</SidebarFooter>
		</Sidebar>
	);
}
