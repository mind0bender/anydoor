import { redirect } from "next/navigation";
import { categories } from "./data";

const DiscoverPage = () => {
  const first = categories[0];
  redirect(`/discover/${first?.slug ?? "spa"}`);
};

export default DiscoverPage;
