"use client";

import { useQueryState } from "nuqs";

import { logos } from "@/constants/logos";
import type { Category } from "@/constants/logos";
import { ROUTES } from "@/constants/routes";

interface Props {
  gridIndex: number;
}

export default function LogoGridCell({ gridIndex }: Props) {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [category] = useQueryState("category");
  const [, setView] = useQueryState("view");

  const logo = logos[gridIndex % logos.length];
  if (!logo) {
    return null;
  }

  const matchesSearch =
    !search ||
    logo.brand.toLowerCase().includes(search.toLowerCase()) ||
    logo.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

  const matchesCategory = !category || logo.category === (category as Category);

  const visible = matchesSearch && matchesCategory;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (visible) {
          setView(logo.id);
        }
      }}
      className={`absolute inset-1 flex items-center justify-center rounded-xl transition-all ${
        visible
          ? "opacity-100 hover:bg-muted"
          : "opacity-15 pointer-events-none"
      }`}
    >
      <img
        draggable={false}
        src={`${ROUTES.API.LOGO}/${logo.id}`}
        alt={logo.brand}
        className="w-3/4 h-3/4 object-contain"
        onError={(e) => {
          e.currentTarget.src = ROUTES.PLACEHOLDER;
        }}
      />
    </button>
  );
}
