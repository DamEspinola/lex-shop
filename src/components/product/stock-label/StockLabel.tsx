"use client";

import React, { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import { getStockBySlug } from "@/actions";
import clsx from "clsx";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setstock] = useState(0);

  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setstock(inStock);
      setIsloading(false);
    };
    getStock();
  }, [slug]);

  return (
    <div>
      {isloading ? (
        <h1 className={` bg-slate-400 w-20 rounded animate-pulse`}>&nbsp;</h1>
      ) : (
        <h1
          className={clsx(
            `${titleFont.className} antialiased font-bold text-xl mb-4`,
            {
              "text-red-700": stock === 0,
              "text-green-700": stock > 0,
            }
          )}
        >
          Stock: {stock}
        </h1>
      )}
    </div>
  );
};
