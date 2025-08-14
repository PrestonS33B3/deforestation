import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Database, 
  Search, 
  Calendar, 
  Upload, 
  List
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: Database },
  { title: "Report Incident", url: "/reports", icon: Upload },
  { title: "Alerts", url: "/alerts", icon: Calendar },
  { title: "Community", url: "/community", icon: List },
  { title: "Analytics", url: "/analytics", icon: Search },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isGroupOpen, setIsGroupOpen] = useState(true);

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-forest-100 text-forest-800 font-medium border-r-2 border-forest-500" : "hover:bg-forest-50 text-forest-700";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-forest-200 bg-gradient-to-b from-forest-50 to-forest-100`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-forest-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full forest-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌲</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-poppins font-semibold text-forest-800">EcoGuardian</h2>
              <p className="text-xs text-forest-600">Kenya Community Hub Forest Care</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-forest-700 font-medium">
            Forest Monitoring
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {isCollapsed && (
        <div className="p-2">
          <SidebarTrigger className="w-full justify-center" />
        </div>
      )}
    </Sidebar>
  );
}