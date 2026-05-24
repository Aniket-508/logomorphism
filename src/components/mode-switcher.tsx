"use client";

import { ThemeIcon } from "@/components/icons";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export const ModeSwitcher = () => {
  const { toggleTheme } = useThemeToggle();

  return (
    <TooltipButton
      label="Toggle theme"
      shortcut="D"
      variant="outline"
      size="icon-sm"
      onClick={toggleTheme}
    >
      <ThemeIcon className="size-4.5" strokeWidth="2" />
      <span className="sr-only">Toggle theme</span>
    </TooltipButton>
  );
};
