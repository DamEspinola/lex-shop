"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Submenu } from "./Submenu";
import { TbMoodKid } from "react-icons/tb";

export const MultiLevelDropdown = () => {
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const mainDropdownRef = useRef<NodeJS.Timeout | null>(null);
  const subDropdownRef = useRef<NodeJS.Timeout | null>(null);

  const handleMainDropdownEnter = () => {
    if (mainDropdownRef.current) {
      clearTimeout(mainDropdownRef.current);
    }
    setShowMainDropdown(true);
  };

  const handleMainDropdownLeave = () => {
    mainDropdownRef.current = setTimeout(() => {
      setShowMainDropdown(false);
      setActiveSubmenu(null);
    }, 200);
  };

  const handleSubmenuEnter = (submenu: string) => {
    if (subDropdownRef.current) {
      clearTimeout(subDropdownRef.current);
    }
    setActiveSubmenu(submenu);
  };

  const handleSubmenuLeave = () => {
    subDropdownRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMainDropdownEnter}
      onMouseLeave={handleMainDropdownLeave}
    >
      <button className="flex items-center my-2 p-2 hover:bg-green-800 rounded transition-all">
        <RxHamburgerMenu size={20} />
        <span className="ml-3">Todas las Categorias</span>

        <CgChevronDown className="ml-3" size={20} />
      </button>

      {showMainDropdown && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 w-full">
          <ul className="text-sm text-black dark:text-black">
            <Submenu
              label="Tecnología"
              icon={<MdPhoneIphone size={20} className="mr-2" />}
              submenuKey="technology"
              activeSubmenu={activeSubmenu}
              handleSubmenuEnter={handleSubmenuEnter}
              handleSubmenuLeave={handleSubmenuLeave}
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
            <Submenu
              label="Belleza & Moda"
              icon={<FaBagShopping size={20} className="mr-2" />}
              submenuKey="beauty"
              activeSubmenu={activeSubmenu}
              handleSubmenuEnter={handleSubmenuEnter}
              handleSubmenuLeave={handleSubmenuLeave}
              items={[
                { href: "/category/fashion_men", label: "Moda masculina" },
                { href: "/category/fashion_women", label: "Moda Femenina" },
                { href: "/category/fashion_unisex", label: "Moda Unisex" },
                { href: "/category/accessories", label: "Accesorios" },
                { href: "/category/fragances", label: "Perfumes" },
              ]}
            />

            <Submenu
              label="Kids"
              icon={<TbMoodKid size={20} className="mr-2" />}
              submenuKey="Kids"
              activeSubmenu={activeSubmenu}
              handleSubmenuEnter={handleSubmenuEnter}
              handleSubmenuLeave={handleSubmenuLeave}
              items={[
                { href: "/category/fashion_kid", label: "Moda para Niños" },
                { href: "/category/Kids/toys", label: "Juguetes" },
                { href: "/category/Kids/backpack", label: "Mochila" },
              ]}
            />
            <Link
              href="/"
              className="flex items-center justify-between w-full px-4 py-2 transition-all dark:hover:bg-gray-100"
            >
              Varios
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
