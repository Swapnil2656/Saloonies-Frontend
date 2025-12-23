import * as React from "react"
import {
  LayoutDashboardIcon,
  UsersIcon,
  ScissorsIcon,
  PackageIcon,
  CalendarIcon,
  CreditCardIcon,
  BarChartIcon,
  UserCheckIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Saloonies Admin",
    email: "admin@saloonies.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Services",
      url: "/services",
      icon: ScissorsIcon,
    },
    {
      title: "Staff",
      url: "/staff", 
      icon: UserCheckIcon,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: CalendarIcon,
    },
    {
      title: "Products", 
      url: "/products",
      icon: PackageIcon,
    },
    {
      title: "Customers",
      url: "/customers", 
      icon: UsersIcon,
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: CalendarIcon,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCardIcon,
    },
    {
      title: "Reports",
      url: "/reports", 
      icon: BarChartIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ScissorsIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Saloonies</span>
                  <span className="truncate text-xs">Salon Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
