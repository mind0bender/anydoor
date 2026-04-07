import { notFound } from "next/navigation";
import { categories, Listing, CategoryDefinition } from "../../data";
import CompanyProfile from "../CompanyProfile";

interface PageProps {
  params: { category: string; company: string };
}

export default async function CompanyPage({ params }: PageProps) {
  const resolved = params instanceof Promise ? await params : params;
  const { category, company } = resolved;
  const cat: CategoryDefinition | undefined = categories.find((c) => c.slug === category);
  if (!cat) return notFound();
  const listing: Listing | undefined = cat.listings.find((l) => l.id === company);
  if (!listing) return notFound();
  return <CompanyProfile listing={listing} category={cat} />;
}
