"use client";

import AppSidebar from "@/components/app-sidebar";
import { ModeSwitcher } from "@/components/mode-switcher";

export default function HeaderControls() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <ModeSwitcher />
      <AppSidebar />
    </div>
  );
}
