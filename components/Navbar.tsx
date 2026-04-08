"use client";

import { Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, JSX } from "react";

const Navbar: FC = (): JSX.Element => {
  const pathname = usePathname();

  const links = [
    { href: "/discover", label: "Discover", match: "/discover" },
    { href: "/bookings", label: "Bookings", match: "/bookings" },
    { href: "/bookings/history", label: "History", match: "/bookings/history" },
    { href: "/favourites", label: "Favourites", match: "/favourites" },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-[#e8fff9]/85 backdrop-blur-md px-4 sm:px-8 py-3">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-[#003531]">
            AnyDoor
          </Link>
          <ul className="hidden sm:flex items-center gap-2">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.match}/`);
              return (
                <li key={link.href}>
                  <Link
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active ? "bg-[#0b6b5d] text-white" : "text-[#14544d] hover:bg-white/80"
                    }`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-full p-2.5 text-[#0b6b5d] hover:bg-white/80 transition" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="rounded-full p-2.5 text-[#0b6b5d] hover:bg-white/80 transition" aria-label="Account">
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
