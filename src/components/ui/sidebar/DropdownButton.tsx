"use client";

import Link from "next/link";
import { useState } from "react";
import { BsPlugin } from "react-icons/bs";
import {  FaStore } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdPhoneIphone } from "react-icons/md";
import { PiMonitorLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

export const DropdownButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <>
      <button
        id="dropdownDefaultButton"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        type="button"
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"

      >
        <RxHamburgerMenu size={30} />
        <span className="ml-3 text-xl">Categorias</span>
        <IoIosArrowDown className="ml-3" size={20} />

      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          id="dropdown"
          className="z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <Link
            aria-labelledby="dropdownDefaultButton"
            href="/category/informatics"
            className="flex items-center mt-5 p-3 hover:bg-gray-100 rounded transition-all"
          >
            <PiMonitorLight size={20} className="mr-2" />
            Informática
          </Link>
          <Link
            aria-labelledby="dropdownDefaultButton"
            href="/category/appliances"
            className="flex items-center  p-3 hover:bg-gray-100 rounded transition-all"
          >
            <BsPlugin size={20} className="mr-2" />
            Electrodomésticos
          </Link>
          <Link
            aria-labelledby="dropdownDefaultButton"
            href="/category/fashion_unisex"
            className="flex items-center  p-3 hover:bg-gray-100 rounded transition-all"
          >
            <FaBagShopping size={20} className="mr-2" />
            Belleza & Moda
          </Link>
          <Link
            aria-labelledby="dropdownDefaultButton"
            href="/category/smartphones"
            className="flex items-center  p-3 hover:bg-gray-100 rounded transition-all"
          >
            <MdPhoneIphone size={20} className="mr-2" />
            Celulares
          </Link>
          <Link
            aria-labelledby="dropdownDefaultButton"
            href="/"
            className="flex items-center  p-3 hover:bg-gray-100 rounded transition-all"
          >
            <FaStore size={20} className="mr-2" />
            Varios
          </Link>
        </div>
      )}
    </>
  );
};
