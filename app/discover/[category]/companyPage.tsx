import { notFound } from "next/navigation";
import { categories, Listing } from "../data";
import CompanyProfile from "./CompanyProfile";

interface PageProps {
  params: { category: string; company: string };
}

export default function CompanyPage({ params }: PageProps) {
  const { category, company } = params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const listing = cat.listings.find((l) => l.id === company);
  if (!listing) notFound();
  return <CompanyProfile listing={listing} category={cat} />;
}
