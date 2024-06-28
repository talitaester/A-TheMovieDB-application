import Image from "next/image";
import MovieBanner from "../../public/movie-banner.jpg";
import MovieLogo from "../../public/svg/movieLogo";
import Play from "../../public/svg/icons/play";

const Banner = () => {
  return (
    <div className="relative w-full h-[550px] -mt-[84px]" id="banner">
      <div className="absolute bottom-12 left-12">
        <MovieLogo />
        <p className="w-[420px] mt-6 text-[#E2EBEB] text-opacity-80 font-light">
          An internal succession war within House Targaryen at the height of its
          power, 172 years before the birth of Daenerys Targaryen.
        </p>
        <button className="flex flex-row gap-3 items-center bg-[#26292A] bg-opacity-60 backdrop-blur-md py-4 px-5 rounded-2xl mt-9">
          <Play />
          <span>Watch now</span>
        </button>
      </div>
      <div className="absolute bottom-0 h-[370px] w-full bg-gradient-to-t from-[#0B0E0F] to-[rgba(11, 14, 15, 0.05)] -z-30"></div>
      <Image
        src={MovieBanner}
        alt={"Movie Banner"}
        unoptimized={true}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        className="-z-40"
      />
    </div>
  );
};

export default Banner;
