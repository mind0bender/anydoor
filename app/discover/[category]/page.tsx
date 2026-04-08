import { notFound } from "next/navigation";
import { categorySlugs, getCategoryBySlug } from "../data";
import DiscoverClient, { ViewMode } from "./DiscoverClient";

interface PageProps {
  params: Promise<{ category: string }> | { category: string };
  searchParams?: { view?: string | string[] };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ category: slug }));
}

const DiscoverCategoryPage = async ({ params, searchParams }: PageProps) => {
  const resolved = params instanceof Promise ? await params : params;
  const category = getCategoryBySlug(resolved.category);
  if (!category) {
    notFound();
  }

  const viewParam = Array.isArray(searchParams?.view)
    ? searchParams?.view[0]
    : searchParams?.view;
  const initialView: ViewMode = viewParam === "list" ? "list" : "grid";

  return (
    <main className={`w-full min-h-screen bg-primary-200 text-[#003531]`}>
      <div
        className={`w-full max-w-none px-5 sm:px-8 lg:px-12 xl:px-16 py-10 flex flex-col gap-8`}
      >
        <DiscoverClient
          category={{
            slug: category.slug,
            title: category.title,
            tagline: category.tagline,
            total: category.total,
            listings: category.listings,
          }}
          initialView={initialView}
        />
      </div>
    </main>
  );
};

export default DiscoverCategoryPage;
