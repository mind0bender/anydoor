import Link from "next/link";
import { FC, JSX } from "react";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="bg-[#003531] text-[#e5fff7] px-6 sm:px-10 py-12 mt-8">
      <div className="max-w-350 mx-auto grid gap-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold">AnyDoor</h2>
          <p className="max-w-xl text-[#b7e6dc]">
            Discover premium local services, book in minutes, and keep every
            step connected from discovery to confirmation.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-[#b7e6dc] text-sm">
            <li>
              <Link
                className="hover:text-white transition"
                href="/discover/spa"
              >
                Spa
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white transition"
                href="/discover/hair-salon"
              >
                Hair Salon
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white transition"
                href="/discover/auto-repair"
              >
                Auto Repair
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white transition"
                href="/discover/dentist"
              >
                Dentist
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Stay in the loop</h3>
          <NewsLetter />
        </div>
      </div>

      <div className="max-w-350 mx-auto mt-8 pt-4 border-t border-white/15 text-xs text-[#9fd8cc] flex flex-wrap items-center justify-between gap-2">
        <span>© 2026 AnyDoor. Curated local booking.</span>
        <div className="flex gap-4">
          <Link href="/discover" className="hover:text-white transition">
            Discover
          </Link>
          <Link href="/bookings" className="hover:text-white transition">
            Bookings
          </Link>
          <Link href="/favourites" className="hover:text-white transition">
            Favourites
          </Link>
        </div>
      </div>
    </footer>
  );
};

const NewsLetter: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="border border-white/30 rounded-full px-4 py-2 bg-transparent text-[#e5fff7] placeholder:text-[#9fd8cc] outline-none"
        placeholder="Your email address"
      />
      <button className="w-full px-4 py-2 flex justify-center items-center bg-primary-200 rounded-full text-[#003531] font-semibold outline-none cursor-pointer hover:bg-white transition">
        Subscribe
      </button>
    </div>
  );
};

export default Footer;
