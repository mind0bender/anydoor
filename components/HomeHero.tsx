import { Services } from "@/types/service";
import {
  ArrowRight,
  Flower,
  LocationEdit,
  Pin,
  Scissors,
  Search,
  Smile,
  Star,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { FC, JSX } from "react";

const services: Services[] = [
  Services.Plumbers,
  Services.Electricians,
  Services.Accountants,
  Services.Cleaners,
  Services.Landscapers,
  Services.Carpenters,
  Services.Painters,
  Services.Lawyers,
  Services.Dentists,
];

const HomeHero: FC = (): JSX.Element => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center py-8 gap-12`}
    >
      <div
        className={`flex flex-col sm:flex-row justify-around items-center gap-12 w-full px-8 sm:px-12`}
      >
        <div className={`max-w-lg flex flex-col gap-6`}>
          <div className={`text-6xl whitespace-nowrap font-semibold`}>
            <div className={`text-teal-950`}>Elevate your</div>
            <div className={`italic`}>local ritual.</div>
          </div>
          <div>
            Access a handpicked selection of top-tier services, from serene spas
            to expert mechanics. Seamlessly booked, beautifully delivered.
          </div>
          <div className={`bg-white px-4 py-4 rounded-3xl flex flex-col gap-4`}>
            <label
              className={`bg-teal-200 rounded-full flex items-center px-4`}
            >
              <Search />
              <input
                className={`px-3 py-3 w-full outline-none`}
                placeholder="What are you looking for?"
              />
            </label>
            <label
              className={`bg-teal-200 rounded-full flex items-center px-4`}
            >
              <LocationEdit />
              <input
                className={`px-3 py-3 w-full outline-none`}
                placeholder="Near me"
              />
            </label>
            <button
              className={`bg-primary text-primary-100 rounded-full font-semibold px-4 py-3 outline-none focus:ring-3 hover:ring-3 ring-primary/40 duration-200 cursor-pointer`}
            >
              Explore
            </button>
          </div>
        </div>
        <div className={`relative py-12 px-4 w-full sm:w-auto`}>
          <div className={`relative w-full sm:w-96 lg:w-120 aspect-12/16`}>
            <Image
              className={`object-cover rounded-3xl rotate-2 hover:rotate-0 duration-200`}
              fill
              alt="Service"
              src={`/hero.png`}
            />
          </div>
          <div
            className={`bg-white/80 absolute bottom-4 -left-8 backdrop-blur-sm rounded-md p-4 -rotate-2 shadow-md shadow-primary/20`}
          >
            <div
              className={`font-semibold uppercase text-xs flex justify-center items-center gap-2 text-teal-700`}
            >
              <Star size={16} className={`text-yellow-500 fill-yellow-400`} />
              Top rated
            </div>
            <div className={`font-bold text-sm`}>
              Lumina Wellness &amp;
              <br />
              Esthetics
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full flex flex-col px-8 sm:px-12 gap-8`}>
        <div className={`flex justify-between items-center w-full`}>
          <h2 className={`text-2xl font-semibold`}>Refined Categories</h2>
          <button
            className={`flex justify-center items-center gap-2 group cursor-pointer`}
          >
            View All
            <ArrowRight
              size={16}
              className={`group-hover:translate-x-1 duration-200`}
            />
          </button>
        </div>
        <div className={`sm:flex gap-4 w-full grid grid-cols-2 grid-rows-2`}>
          <CategoryCard
            title={"Spa"}
            icon={
              <div className={`bg-emerald-300 text-emerald-900 p-2`}>
                <Flower />
              </div>
            }
            locationCount={124}
          />
          <CategoryCard
            title={"Hair Salon"}
            icon={
              <div className={`bg-lime-300 text-lime-900 p-2`}>
                <Scissors />
              </div>
            }
            locationCount={124}
          />
          <CategoryCard
            title={"Spa"}
            icon={
              <div className={`bg-orange-300 text-orange-900 p-2`}>
                <Wrench />
              </div>
            }
            locationCount={124}
          />
          <CategoryCard
            title={"Spa"}
            icon={
              <div className={`bg-emerald-300 text-emerald-900 p-2`}>
                <Smile />
              </div>
            }
            locationCount={124}
          />
        </div>
      </div>
      <div className={`rounded-3xl bg-teal-200/80 px-8 sm:px-12 py-16`}>
        <div className={`w-1/2 flex flex-col gap-4`}>
          <h2 className={`text-3xl sm:text-4xl font-semibold text-teal-950`}>
            Join a community of informed locals.
          </h2>
          <p>
            Thousands of successful bookings managed this week. Trust the
            collective wisdom of your neighbors.
          </p>
          <div className={`font-semibold text-sm text-teal-950`}>
            12k+ Active Users this month
          </div>
        </div>
      </div>
      <div className={`w-1/2`}></div>
    </div>
  );
};

interface CategoryCardProps {
  icon: JSX.Element;
  title: string;
  locationCount: number;
}

const CategoryCard: FC<CategoryCardProps> = ({
  icon,
  title,
  locationCount,
}: CategoryCardProps): JSX.Element => {
  return (
    <div
      className={`bg-teal-200/60 p-4 sm:p-6 rounded-lg grow flex flex-col gap-1 grid-cols-1 hover:bg-primary-100 hover:ring ring-teal-200 duration-200 group cursor-default`}
    >
      <div
        className={`rounded-lg w-fit overflow-hidden group-hover:scale-105 duration-200`}
      >
        {icon}
      </div>
      <h3 className={`font-semibold text-teal-950`}>{title}</h3>
      <p className={`text-sm`}>
        {locationCount} {locationCount === 1 ? <>location</> : <>locations</>}
      </p>
    </div>
  );
};

export default HomeHero;
