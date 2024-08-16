"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { PiMonitorLight } from "react-icons/pi";
import { BsPlugin } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { Dropdown } from "./Dropdown";
import { FaBagShopping } from "react-icons/fa6";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href="/">
          <span
            className={`${titleFont.className} antialiased font-bold text-green-700`}
          >
            Lex Shipping
          </span>
          <span className={`${titleFont.className} antialiased font-bold`}>
            {" "}
            | Tienda
          </span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className="hidden sm:flex space-x-2">
        <Link
          href="/category/informatics"
          className="m-2 p-2 flex rounded-md transition-all hover:bg-gray-100"
        >
          <PiMonitorLight size={20} className="mr-2" />
          Informática
        </Link>
        <Link
          href="/category/appliances"
          className="m-2 p-2 flex rounded-md transition-all hover:bg-gray-100"
        >
          <BsPlugin size={20} className="mr-2" />
          Electrodomésticos
        </Link>
        <Dropdown
          items={[
            { href: "/category/fashion_men", label: "Moda masculina" },
            { href: "/category/fashion_women", label: "Moda Femenina" },
            { href: "/category/fashion_kid", label: "Moda para Niños" },
            { href: "/category/fashion_unisex", label: "Moda Unisex" },
            { href: "/category/accessories", label: "Accesorios" },
            { href: "/category/fragances", label: "Perfumes" },
          ]}
        >
          <FaBagShopping size={20} className="mr-2" />
          Belleza & Moda
        </Dropdown>
        <Link
          href="/category/smartphones"
          className="m-2 p-2 flex rounded-md transition-all hover:bg-gray-100"
        >
          <MdPhoneIphone size={20} className="mr-2" />
          Celulares
        </Link>
        <Link
          href="/"
          className="m-2 p-2 flex  rounded-md transition-all hover:bg-gray-100"
        >
          <FaStore size={20} className="mr-2" />
          Varios
        </Link>
      </div>
      {/* Search, cart, menu */}
      <div className="flex items-center">
        <button onClick={openSideMenu} className="mx-2">
          <IoSearchOutline size={20} />
        </button>
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
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
