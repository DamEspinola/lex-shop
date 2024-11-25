import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { Dropdown } from "./Dropdown";

interface Props {
  label: string;
  icon: React.ReactNode;
  submenuKey: string;
  activeSubmenu: string | null;
  handleSubmenuEnter: (submenu: string) => void;
  handleSubmenuLeave: () => void;
  items: { href: string; label: string }[];
}

export const Submenu = ({
  label,
  icon,
  submenuKey,
  activeSubmenu,
  handleSubmenuEnter,
  handleSubmenuLeave,
  items,
}: Props) => {
  return (
    <div
      onMouseEnter={() => handleSubmenuEnter(submenuKey)}
      onMouseLeave={handleSubmenuLeave}
      className="relative"
    >
      <button className="flex items-center justify-between w-full px-4 py-2 transition-all dark:hover:bg-gray-100">
        {label}
        <MdNavigateNext size={20} />
      </button>
      {activeSubmenu === submenuKey && (
        <div className="absolute ml-3 left-full py-2 text-sm text-black top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
          <span className="font-bold flex text-xl items-center mb-2 px-4 py-2">
            {icon}
            {label}
          </span>
          <Dropdown items={items} />
        </div>
      )}
    </div>
  );
};
