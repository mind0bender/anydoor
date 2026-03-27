import HomeHero from "@/components/HomeHero";
import { NextPage } from "next";
import { JSX } from "react";

const Home: NextPage = (): JSX.Element => {
  return (
    <main className={`w-full grow`}>
      <HomeHero />
    </main>
  );
};
export default Home;
