import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/base/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PurchLogoSquare } from "@/components/icons/purch-logo";
import { Link } from "@tanstack/react-router";
import { pages } from "../../config/pages";
import { useSidebar } from "../base/sidebar";
import { Button } from "../base/button";

export function NavBar() {
  const { open, isMobile, openMobile, toggleSidebar } = useSidebar();

  const openOrMobile = open || (isMobile && openMobile);

  return (
    <Sidebar
      collapsible="icon"
      onClick={(e) => {
        if (!e.target.closest("button") && !openOrMobile) toggleSidebar();
      }}
    >
      <SidebarHeader>
        <Link to="/">
          {openOrMobile ? (
            <div className="flex ml-1 mt-2 justify-between items-center">
              <div className="flex items-center h-8 group cursor-pointer w-fit">
                <PurchLogoSquare color="black" size="27" />
                <span className="logo-text font-bold text-xl mb-1 ml-2">
                  Purch
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={toggleSidebar}>
                <PanelLeftClose />
              </Button>
            </div>
          ) : (
            <div className="flex ml-1 items-center mt-2 h-8">
              <PurchLogoSquare color="black" size="27" />
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {pages.map((page) => (
              <Link key={page.url} to={page.url} className="navbar-item">
                <SidebarMenuButton tooltip={!openOrMobile ? page.display : ""}>
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
