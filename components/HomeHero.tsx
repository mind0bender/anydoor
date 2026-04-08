import { FC, JSX } from "react";
import { MapPin, Search, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HomeHero: FC = (): JSX.Element => {
  return (
    <section
      className={`w-full bg-[#dff8f2] text-[#003531] px-6 sm:px-10 lg:px-16 py-12 lg:py-16 rounded-3xl shadow-sm`}
    >
      <div className={`grid lg:grid-cols-12 gap-10 items-center`}>
        <div className={`lg:col-span-6 flex flex-col gap-6`}>
          <div className={`text-5xl lg:text-6xl font-semibold leading-tight`}>
            <div className={`text-[#0f372f]`}>Elevate your</div>
            <div className={`italic text-[#0b6b5d]`}>local ritual.</div>
          </div>
          <p className={`text-lg text-[#1e5a52] max-w-xl`}>
            Access a handpicked selection of top-tier services, from serene spas
            to expert mechanics. Seamlessly booked, beautifully delivered.
          </p>
          <div
            className={`bg-white rounded-full shadow-md flex flex-col sm:flex-row gap-3 p-3`}
          >
            <label
              className={`flex items-center gap-3 bg-[#eef8f4] rounded-full px-4 py-3 w-full`}
            >
              <Search className={`text-[#0b6b5d]`} size={18} />
              <input
                className={`w-full bg-transparent outline-none text-[#0f372f] placeholder:text-[#0f372f]/60`}
                placeholder="What are you looking for?"
              />
            </label>
            <label
              className={`flex items-center gap-3 bg-[#eef8f4] rounded-full px-4 py-3 w-full`}
            >
              <MapPin className={`text-[#0b6b5d]`} size={18} />
              <input
                className={`w-full bg-transparent outline-none text-[#0f372f] placeholder:text-[#0f372f]/60`}
                placeholder="Near me"
              />
            </label>
            <Link
              href="/discover/spa"
              className={`bg-linear-to-r from-[#0f6b5a] to-[#0c5247] text-white font-semibold rounded-full px-6 py-3 shrink-0 hover:opacity-90 transition text-center`}
            >
              Explore
            </Link>
          </div>
        </div>
        <div className={`lg:col-span-6 relative flex justify-center`}>
          <div
            className={`relative w-full max-w-105 aspect-4/5 rounded-[28px] overflow-hidden rotate-2 hover:rotate-0 transition duration-500 shadow-lg`}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9bAiXXFru4FDEK5wabe4aoV7Xd4NlbmLUKBTkaZrqdYg2ZZPux8JI_jSArMK1jWphl4s44-gBDma09vX4_Hx43EzX8Cc7bkoUgebwccGRtYllJYmqX5FoRyl7dBTGdcD0RojC9Jc377gsxpaSSlXtQDvWN83YmiHBKisOt_bt2g_cvTl4Gm6iG5BR6wIQ_1NPBLfn2lmExnoR3_cKzryd3P61miQs02NirpLBHbsiasH_XlgN84adaMoK30UoRpF7X5rbcgyPCj7_"
              alt="Luxurious minimalist spa interior"
              fill
              className={`w-full h-full object-cover`}
              sizes="(max-width: 1024px) 90vw, 420px"
            />
            <div
              className={`absolute bottom-4 left-4 bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-md max-w-55 border border-white/70`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold uppercase text-[#0f6b5a] tracking-widest mb-2`}
              >
                <Star className={`text-[#ffb703] fill-[#ffb703]`} size={16} />
                Top Rated
              </div>
              <p className={`font-semibold leading-tight text-[#0f372f]`}>
                Lumina Wellness & Esthetics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
