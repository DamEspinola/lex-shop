import React from "react";
import { Dropdown } from "../top-menu/Dropdown";
import { CgChevronDown } from "react-icons/cg";

interface Props {
  label: string;
  icon?: React.ReactNode;
  submenuKey: string;
  activeSubmenu: string | null;
  handleSubmenuClick: (submenu: string) => void;
  items: { href: string; label: string }[];
}

export const MobileSubmenu = ({
  label,
  // icon,
  submenuKey,
  activeSubmenu,
  handleSubmenuClick,
  items,
}: Props) => {
  const isActive = activeSubmenu === submenuKey;

  return (
    <div className="relative">
      <button
        onClick={() => handleSubmenuClick(submenuKey)}
        className="flex items-center text-lg justify-between w-full px-4 py-2 transition-all dark:hover:bg-gray-100"
      >
        {label}
        <CgChevronDown size={20} />
      </button>
      {isActive && (
        <div className="relative py-2 text-lg text-black top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
          {/* <span className="font-bold flex text-xl items-center mb-2 px-4 py-2">
            {icon}
            {label}
          </span> */}
          <Dropdown items={items} />
        </div>
      )}
    </div>
  );
};
