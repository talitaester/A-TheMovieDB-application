import Image from "next/image";
import Mosaic from "../../../public/mosaic-movies.webp";
import Vignette from "../../../public/vignette.png";
import Link from "next/link";
import { useState } from 'react';

export default function Initial() {

  return (
    <>
      <header className="w-screen h-24 fixed top-0 flex flex-row items-center justify-between pl-24 pr-12 z-10">
        <p>logo</p>
        <div className="flex gap-2">
          <button className="px-7 h-11 bg-gradient-to-b from-[#163E4B] to-[#19475B] rounded-full drop-shadow-button">
            <span className="text-sm font-semibold">ASSINE AGORA</span>
          </button>
          <Link href="/login">
            <button
              className="bg-solidblack bg-opacity-20 backdrop-blur-2xl px-9 h-11 rounded-full"
              id="entrar"
            >
              <span className="text-sm font-semibold">ENTRAR</span>
            </button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center">
        <h2 className="text-center text-3xl font-semibold mb-1 drop-shadow-heading">
          CONFIRA A ASSINATURA ANUAL
        </h2>
        <h1 className="text-center text-6xl font-semibold drop-shadow-heading">
          ECONOMIZE <span className="text-[#196B8F]">50%</span>
        </h1>
        <Link href="/login">
          <button className="mt-6 px-8 h-[55px] bg-gradient-to-b from-[#105268] to-[#177797] rounded-full drop-shadow-button">
            <span className="text-lg font-semibold">ASSINE AGORA</span>
          </button>
        </Link>
      </main>
      <Image src={Vignette} alt="" width={500} className="absolute -z-10" />
      <Image
        src={Mosaic}
        alt=""
        unoptimized={true}
        layout="fill"
        objectFit="cover"
        className="w-full h-full -z-20"
      ></Image>
    </>
  );
}
