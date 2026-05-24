"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { use, useEffect } from "react";

import LogoGridCell from "@/components/logo-grid-cell";
import ThingsGrid from "@/components/things-grid";
import type { ItemConfig } from "@/components/things-grid";
import { categories } from "@/constants/logos";

const sizeOptions = ["s", "m", "l"] as const;
type GridSize = (typeof sizeOptions)[number];

const gridSizeMap: Record<GridSize, number> = { l: 220, m: 160, s: 100 };

const renderLogoCell = ({ gridIndex }: ItemConfig) => (
  <LogoGridCell gridIndex={gridIndex} />
);

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [size] = useQueryState(
    "size",
    parseAsStringLiteral(sizeOptions).withDefault("m")
  );
  const [, setCategoryFilter] = useQueryState("category");

  const cat = categories.find((c) => c.key === category);

  useEffect(() => {
    if (cat) {
      void setCategoryFilter(cat.key);
    }
    return () => {
      void setCategoryFilter(null);
    };
  }, [category, cat, setCategoryFilter]);

  if (!cat) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground text-sm">
        Category not found
      </div>
    );
  }

  return (
    <ThingsGrid
      gridSize={gridSizeMap[size]}
      renderItem={renderLogoCell}
      initialPosition={{ x: 0, y: 0 }}
    />
  );
}
