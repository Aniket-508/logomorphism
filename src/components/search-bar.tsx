"use client";

import { useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });

  return (
    <div className="fixed top-4 left-4 z-50">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value || null)}
        placeholder="Search logos..."
        className="w-56 bg-background/80 backdrop-blur-sm"
      />
    </div>
  );
}
