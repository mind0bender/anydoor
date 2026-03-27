import { FC, JSX } from "react";

const Footer: FC = (): JSX.Element => {
  return (
    <footer
      className={`bg-primary text-primary-100 px-8 py-12 gap-8 flex flex-col justify-center items-center`}
    >
      <table className={`w-full table-auto border-separate border-spacing-4`}>
        <thead>
          <tr className={`font-semibold table-row`}>
            <td className={`text-2xl sm:text-4xl font-semibold px-2`}>
              AnyDoor
            </td>
            <td className={`px-2`}>Explore</td>
            <td className={`px-2`}>Platform</td>
            <td className={`px-2 hidden sm:table-cell text-center`}>
              Join The Journey
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className={`table-row`}>
            <td className={`px-2 align-top`}>
              <div className={`max-w-64 sm:max-w-96`}>
                Redefining local discovery through intentional design and
                uncompromising quality.
              </div>
            </td>
            <td className={`px-2`}>
              <ul className={`text-primary-100/80`}>
                <li>Featured Artisans</li>
                <li>Wellness Guild</li>
                <li>Automotive Experts</li>
                <li>Local Favourites</li>
              </ul>
            </td>
            <td className={`px-2`}>
              <ul className={`text-primary-100/80`}>
                <li>Featured Artisans</li>
                <li>Wellness Guild</li>
                <li>Automotive Experts</li>
                <li>Local Favourites</li>
              </ul>
            </td>
            <td className={`px-2 sm:flex flex-col gap-4 hidden`}>
              <NewsLetter />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`flex flex-col gap-4 sm:hidden`}>
        <div className={`font-semibold w-full text-center`}>
          Join The Journey
        </div>
        <NewsLetter />
      </div>
    </footer>
  );
};

const NewsLetter: FC = (): JSX.Element => {
  return (
    <>
      <input
        className={`border border-primary-200/80 rounded-full px-4 py-2 text-primary-100 outline-none`}
        placeholder="Your email address"
      />
      <button
        className={`w-full px-4 py-2 flex justify-center items-center bg-primary-200 rounded-full text-primary outline-none cursor-pointer hover:ring ring-primary-100/40`}
      >
        Subscribe
      </button>
    </>
  );
};

export default Footer;
