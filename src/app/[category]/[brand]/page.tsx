import { logos } from "@/constants/logos";

import BrandPageClient from "./page.client";

export const generateStaticParams = () =>
  logos.map((logo) => ({
    brand: logo.id,
    category: logo.category,
  }));

export default function BrandPage({
  params,
}: {
  params: Promise<{ category: string; brand: string }>;
}) {
  return <BrandPageClient params={params} />;
}
