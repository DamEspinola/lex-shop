import Link from "next/link";
import { ReactNode, useState } from "react";

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

export const Dropdown = ({ items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div>
        <ul className=" text-sm text-black dark:text-black">
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
    </div>
  );
};
