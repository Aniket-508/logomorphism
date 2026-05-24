"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import LogoDetailView from "@/components/logo-detail-view";
import { getAdjacentLogo, logos } from "@/constants/logos";

export default function BrandPageClient({
  params,
}: {
  params: Promise<{ category: string; brand: string }>;
}) {
  const { category, brand } = use(params);
  const router = useRouter();

  const logo = logos.find((l) => l.id === brand && l.category === category);

  if (!logo) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground text-sm">
        Logo not found
      </div>
    );
  }

  const prev = getAdjacentLogo(logo.id, -1);
  const next = getAdjacentLogo(logo.id, 1);

  return (
    <LogoDetailView
      logo={logo}
      onPrev={
        prev ? () => router.push(`/${prev.category}/${prev.id}`) : undefined
      }
      onNext={
        next ? () => router.push(`/${next.category}/${next.id}`) : undefined
      }
      showNav
      layout="page"
    />
  );
}
