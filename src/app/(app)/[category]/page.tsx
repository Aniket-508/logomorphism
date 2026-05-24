import { categories } from "@/constants/logos";

import CategoryPageClient from "./page.client";

export const generateStaticParams = () =>
  categories.map((category) => ({
    category: category.key,
  }));

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return <CategoryPageClient params={params} />;
}
