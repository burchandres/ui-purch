import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
} from '@/components/base/sidebar';
import { PurchLogoSquare } from '@/components/icons/purch-logo';
import { Link } from '@tanstack/react-router';
import { pages } from '../../config/pages';
import { useSidebar } from '../base/sidebar';

export function NavBar() {
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Link to="/">
					{open ? (
						<div className="flex items-center ml-5 mt-2">
							<PurchLogoSquare color="black" size="35" />
							<span className="logo-text font-bold text-xl mb-1 ml-2">
								Purch
							</span>
						</div>
					) : (
						<div className="flex items-center justify-center ml-1 mt-1">
							<PurchLogoSquare color="black" size="26" />
						</div>
					)}
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{pages.map((page) => (
							<Link key={page.url} to={page.url} className="navbar-item">
								<SidebarMenuButton>
									{page.icon && <page.icon />}
									<span className="navbar-item">{page.display}</span>
								</SidebarMenuButton>
							</Link>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
