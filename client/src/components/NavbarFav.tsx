import Link from "next/link";
import Person from "../../public/svg/icons/person";
import House from "../../public/svg/icons/house";
import Search from "../../public/svg/icons/search";

const Navbar = () => {
  return (
    <nav className="w-full z-40 ">
      <div className="px-12 py-5 flex flex-row items-center justify-between transition duration-500bg-opacity-90">
        <div className="flex flex-row items-center">
          <button>
            <span className="ml-10 text-xl font-semibold">Logo</span>
          </button>
          <ul className="flex flex-row gap-12 ml-[100px] text-base tracking-wide">
            <li>
              <Link href={""}>Home</Link>
            </li>
            <li>
              <Link href={""}>Store</Link>
            </li>
            <li>
              <Link href={""}>Library</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <button className="flex w-12 h-9 bg-[#26292A] bg-opacity-30 backdrop-blur-xl drop-shadow-button border-white border-opacity-5 border-[1px] rounded-full items-center justify-center">
            <Link href={""}>
              <House />
            </Link>
          </button>
          <div className="flex flex-row items-center h-[42px] px-5 pr-4 bg-[#26292A] bg-opacity-30 backdrop-blur-xl drop-shadow-button border-white border-opacity-5 border-[1px] rounded-full">
            <input
              type="search"
              placeholder="Search for a movie, or tv show..."
              className="w-[230px] focus:outline-none focus:ring-0 bg-transparent"
            />
            <Search />
          </div>
          <button>
            <Person />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
