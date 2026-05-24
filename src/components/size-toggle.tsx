"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sizeOptions = ["s", "m", "l"] as const;
type GridSize = (typeof sizeOptions)[number];

const sizes = [
  { key: "s" as const },
  { key: "m" as const },
  { key: "l" as const },
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
        {sizes.map((s) => (
          <ToggleGroupItem
            key={s.key}
            value={s.key}
            className="px-3"
            aria-label={`${s.key.toUpperCase()} size`}
          >
            {s.key.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
