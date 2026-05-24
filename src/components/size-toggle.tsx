"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Grid3x3Icon, TableIcon, LayersIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sizeOptions = ["s", "m", "l"] as const;
type GridSize = (typeof sizeOptions)[number];

const sizes = [
  { icon: Grid3x3Icon, key: "s" as const },
  { icon: TableIcon, key: "m" as const },
  { icon: LayersIcon, key: "l" as const },
];

export default function SizeToggle() {
  const [size, setSize] = useQueryState(
    "size",
    parseAsStringLiteral(sizeOptions).withDefault("m")
  );

  return (
    <div className="fixed bottom-6 left-4 z-50">
      <ToggleGroup
        value={[size]}
        onValueChange={(val: string[]) =>
          val.length > 0 && setSize(val[0] as GridSize)
        }
        variant="outline"
        spacing={0}
      >
        {sizes.map((s) => {
          const Icon = s.icon;
          return (
            <ToggleGroupItem
              key={s.key}
              value={s.key}
              className="px-3"
              aria-label={`${s.key.toUpperCase()} size`}
            >
              <Icon className="size-3.5" />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
