"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import LogoGridCell from "@/components/logo-grid-cell";
import ThingsGrid from "@/components/things-grid";
import type { ItemConfig } from "@/components/things-grid";

const sizeOptions = ["s", "m", "l"] as const;
type GridSize = (typeof sizeOptions)[number];

const gridSizeMap: Record<GridSize, number> = { l: 220, m: 160, s: 100 };

const renderLogoCell = ({ gridIndex }: ItemConfig) => (
  <LogoGridCell gridIndex={gridIndex} />
);

export default function HomePage() {
  const [size] = useQueryState(
    "size",
    parseAsStringLiteral(sizeOptions).withDefault("m")
  );

  return (
    <ThingsGrid
      gridSize={gridSizeMap[size]}
      renderItem={renderLogoCell}
      initialPosition={{ x: 0, y: 0 }}
    />
  );
}
