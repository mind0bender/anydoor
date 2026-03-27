import { Bell, User } from "lucide-react";
import Link from "next/link";
import { FC, JSX } from "react";

const Navbar: FC = (): JSX.Element => {
  return (
    <nav
      className={`flex justify-between items-center px-4 py-3 bg-primary-100`}
    >
      <div className={`flex justify-center items-center gap-8`}>
        <span className={`text-2xl font-semibold`}>AnyDoor</span>
        <ul className={`flex gap-4`}>
          <li className={`group`}>
            <Link
              className={`group-hover:font-semibold duration-200`}
              href={"/discover"}
            >
              Discover
            </Link>
            <div className={`hidden group-hover:block border-t-2`} />{" "}
          </li>
          <li className={`group`}>
            <Link
              className={`group-hover:font-semibold duration-200`}
              href={"/bookings"}
            >
              Bookings
            </Link>
            <div className={`hidden group-hover:block border-t-2`} />{" "}
          </li>
          <li className={`group`}>
            <Link
              className={`group-hover:font-semibold duration-200`}
              href={"/favourites"}
            >
              Fovourites
            </Link>
            <div className={`hidden group-hover:block border-t-2`} />{" "}
          </li>
        </ul>
      </div>
      <div className={`flex gap-4`}>
        <Bell size={20} />
        <User size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
