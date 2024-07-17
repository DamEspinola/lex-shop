import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex justify-center w-full text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Lex Shipping 
        </span>
        <span> | Shop </span>
        <span> © {new Date().getFullYear()}</span>
      </Link>
      <Link
        href='/'
        className="mx-3"
      >
        Privacidad & Legal
      </Link>

      <Link
        href='/'
        className="mx-3"
      >
        Ubicaciones
      </Link>
    </div>
  );
};
