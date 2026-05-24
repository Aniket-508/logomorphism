"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories } from "@/constants/logos";

const categoryKeys = [
  "discomorphism",
  "balloonmorphism",
  "monetmorphism",
] as const;

export default function CategoryPills() {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsStringLiteral(categoryKeys)
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ToggleGroup
        value={category ? [category] : []}
        onValueChange={(val: string[]) =>
          setCategory(
            val.length === 0 ? null : (val[0] as (typeof categoryKeys)[number])
          )
        }
        variant="outline"
        spacing={2}
      >
        {categories.map((cat) => (
          <ToggleGroupItem
            key={cat.key}
            value={cat.key}
            className="px-4 text-xs"
            aria-label={`Filter by ${cat.label}`}
          >
            {cat.emoji} {cat.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
