import Link from "next/link";
import { ReactNode, useState } from "react";

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  children: ReactNode;
  items: DropdownItem[];
}

export const Dropdown = ({ children, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div className="absolute left-0  w-48 bg-white shadow-lg rounded-md z-10">
          <ul className="py-1">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
