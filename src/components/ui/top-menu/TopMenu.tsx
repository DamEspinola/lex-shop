"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { IoCartOutline } from "react-icons/io5";
import { Search } from "@/components";
import { MultiLevelDropdown } from "./MultiLevelDropdown";
import { CiLocationOn } from "react-icons/ci";
import { BsMegaphone } from "react-icons/bs";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="bg-green-950">
      <div className="px-10 flex flex-col h-[150px] sm:h-[88px] sm:flex-row justify-between items-center w-full">
        {/* logo */}
        <div className="text-2xl my-3">
          <Link href="/">
            <span
              className={`${titleFont.className} antialiased font-normal text-white`}
            >
              Campestre
            </span>
            <span
              className={`${titleFont.className} antialiased font-bold text-white`}
            >
              {" "}
              | Micro-Importado
            </span>
          </Link>
        </div>
        {/* Center Menu */}
        <div className="sm:flex text-white">
          <Suspense fallback={<div>Loading...</div>}>
            <Search />
          </Suspense>
        </div>

        {/* cart, menu */}
        <div className="flex items-center text-white ">
          <Link
            href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
            className="mx-2"
          >
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-green-700 text-white">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>

          <button
            onClick={openSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:bg-green-950"
          >
            Menú
          </button>
        </div>
      </div>
      <div className="hidden text-white px-10 sm:flex space-x-2 ">
        <MultiLevelDropdown />
        <Link
          href="/"
          className="px-5 items-center my-2 flex  font-medium rounded-md transition-all hover:bg-green-800"
        >
          <BsMegaphone size={20} />
          <span className="ml-3">Novedades</span>
        </Link>
        <Link
          href="/"
          className="px-5 items-center my-2 flex font-medium rounded-md transition-all hover:bg-green-800"
        >
          <CiLocationOn size={20} />
          <span className="ml-3">Nuestra ubicación</span>
        </Link>
      </div>
    </nav>
  );
};
