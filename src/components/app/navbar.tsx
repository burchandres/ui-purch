import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/base/sidebar";
import { PanelLeftClose } from "lucide-react";
import { PurchLogoSquare, PurchLogoText } from "@/components/icons/purch-logo";
import { Link } from "@tanstack/react-router";
import { pagesConfig } from "@/config/pages";
import { useSidebar } from "@/components/base/sidebar";
import { Button } from "@/components/base/button";

export function NavBar() {
  const { open, isMobile, openMobile, toggleSidebar } = useSidebar();

  const openOrMobile = open || (isMobile && openMobile);

  return (
    <Sidebar
      collapsible="icon"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("button") && !openOrMobile)
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
            {pagesConfig.pages.map((page) => (
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
