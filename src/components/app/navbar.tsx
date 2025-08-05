import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/base/sidebar";
import { CircleUser, PanelLeftClose, SquareUser } from "lucide-react";
import { PurchLogoSquare, PurchLogoText } from "@/components/icons/purch-logo";
import { Link } from "@tanstack/react-router";
import { pagesConfig } from "@/config/pages";
import { useSidebar } from "@/components/base/sidebar";
import { Button } from "@/components/base/button";
import { Popover, PopoverContent, PopoverTrigger } from "../base/popover";
import { LogOutButtonDialog } from "./log-out-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../base/dialog";

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
      <SidebarFooter>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton tooltip="Account">
              <SquareUser />
              Account
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent side={openOrMobile ? "top" : "right"} asChild>
            <div className="flex flex-col w-fit gap-2 m-0">
              <Button size="sm" className="max-w-26" variant="ghost">
                <p className="text-xs">Settings</p>
              </Button>
              <LogOutButtonDialog />
            </div>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}
