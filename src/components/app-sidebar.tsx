"use client";

import { PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categories, logos } from "@/constants/logos";
import type { Category } from "@/constants/logos";

import {
  SidebarHeader,
  SidebarContent,
  Sidebar,
  SidebarTrigger,
  SidebarTitle,
  SidebarDescription,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";

const countByCategory = (key: string) =>
  logos.filter((l) => l.category === key).length;

const handleSelect = (_category: Category | null) => {
  // onSelectCategory(category);
  // onOpenChange(false);
};

const AppSidebar = () => (
  <Sidebar side="right">
    <SidebarTrigger
      render={() => (
        <Button variant="outline" size="icon-sm">
          <PanelLeftIcon className="size-4" />
        </Button>
      )}
    />
    <SidebarHeader>
      <SidebarTitle>Collections</SidebarTitle>
      <SidebarDescription>Filter logos by collection</SidebarDescription>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton render={<a href="/" />}>
            All Logos ({logos.length})
          </SidebarMenuButton>
          {categories.map((cat) => (
            <SidebarMenuItem key={cat.key}>
              <SidebarMenuButton
                render={<a href={`/category/${cat.key}`} />}
                isActive={true}
                onClick={() => handleSelect(cat.key)}
              >
                {cat.emoji} {cat.label} ({countByCategory(cat.key)})
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton render={<a href="/" />}>
            Home Grid
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
);

export default AppSidebar;
