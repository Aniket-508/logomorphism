"use client";

import Link from "next/link";

import {
  SidebarHeader,
  SidebarContent,
  Sidebar,
  SidebarTitle,
  SidebarDescription,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { categories, logos } from "@/constants/logos";
import type { Category } from "@/constants/logos";
import { ROUTES } from "@/constants/routes";

const countByCategory = (key: string) =>
  logos.filter((l) => l.category === key).length;

const handleSelect = (_category: Category | null) => {
  // onSelectCategory(category);
  // onOpenChange(false);
};

const AppSidebar = () => (
  <Sidebar side="right">
    <SidebarHeader>
      <SidebarTitle>Collections</SidebarTitle>
      <SidebarDescription>Filter logos by collection</SidebarDescription>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton render={<Link href={ROUTES.HOME} />}>
            All Logos ({logos.length})
          </SidebarMenuButton>
        </SidebarMenuItem>
        {categories.map((cat) => (
          <SidebarMenuItem key={cat.key}>
            <SidebarMenuButton
              render={<Link href={`/${cat.key}`} />}
              isActive={true}
              onClick={() => handleSelect(cat.key)}
            >
              {cat.emoji} {cat.label} ({countByCategory(cat.key)})
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton render={<Link href={ROUTES.HOME} />}>
            Home Grid
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
);

export default AppSidebar;
