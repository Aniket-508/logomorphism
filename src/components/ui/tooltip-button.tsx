import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TooltipButton = ({
  children,
  label,
  shortcut,
  ...props
}: React.ComponentProps<typeof Button> & {
  label: string;
  shortcut?: string;
}) => (
  <Tooltip>
    <TooltipTrigger render={<Button aria-label={label} {...props} />}>
      {children}
    </TooltipTrigger>
    <TooltipContent className={cn(shortcut && "pr-2 pl-3 gap-3")}>
      {label}
      {shortcut && <Kbd>{shortcut}</Kbd>}
    </TooltipContent>
  </Tooltip>
);

export { TooltipButton };
