"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { MobileSubmenu } from "./MobileSubmenu";
import { TbMoodKid } from "react-icons/tb";

export const MobileMultiLevelDropdown = () => {
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleMainDropdownClick = () => {
    setShowMainDropdown(!showMainDropdown);
  };

  const handleSubmenuClick = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  return (
    <div className="relative">
      <button
        onClick={handleMainDropdownClick}
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <RxHamburgerMenu size={30} />
        <span className="ml-3 text-xl">Categorias</span>

        <CgChevronDown className="absolute  right-5 " size={30} />
      </button>

      {showMainDropdown && (
        <div className="relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 w-full">
          <ul className="text-sm text-black dark:text-black">
            <MobileSubmenu
              label="Tecnología"
              // icon={<MdPhoneIphone size={20} className="mr-2" />}
              submenuKey="technology"
              activeSubmenu={activeSubmenu}
              handleSubmenuClick={handleSubmenuClick}
              items={[
                { href: "/category/smartphones", label: "Celulares" },
                { href: "/category/technology/apple", label: "Apple" },
                {
                  href: "/category/technology/informatics",
                  label: "Informática",
                },
                { href: "/category/technology/tablets", label: "tablets" },
                {
                  href: "/category/technology/Chambers",
                  label: "Cámaras y videocámaras",
                },
                {
                  href: "/category/technology/",
                  label: "Electrodomésticos",
                },
              ]}
            />
            <MobileSubmenu
              label="Belleza & Moda"
              icon={<FaBagShopping size={20} className="mr-2" />}
              submenuKey="beauty"
              activeSubmenu={activeSubmenu}
              handleSubmenuClick={handleSubmenuClick}
              items={[
                { href: "/category/fashion_men", label: "Moda masculina" },
                { href: "/category/fashion_women", label: "Moda Femenina" },
                { href: "/category/fashion_unisex", label: "Moda Unisex" },
                { href: "/category/accessories", label: "Accesorios" },
                { href: "/category/fragances", label: "Perfumes" },
              ]}
            />
            <MobileSubmenu
              label="Kids"
              icon={<TbMoodKid size={20} className="mr-2" />}
              submenuKey="Kids"
              activeSubmenu={activeSubmenu}
              handleSubmenuClick={handleSubmenuClick}
              items={[
                { href: "/category/fashion_kid", label: "Moda para Niños" },
                { href: "/category/Kids/toys", label: "Juguetes" },
                { href: "/category/Kids/backpack", label: "Mochila" },
              ]}
            />
            <Link
              href="/"
              className="flex text-xl items-center justify-between w-full px-4 py-2 transition-all dark:hover:bg-gray-100"
            >
              Varios
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
