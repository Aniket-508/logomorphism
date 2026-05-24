"use client";

import AppSidebar from "@/components/app-sidebar";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function HeaderControls() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <ModeSwitcher />
      <SidebarTrigger variant="outline" size="icon-sm" />
      <AppSidebar />
    </div>
  );
}
