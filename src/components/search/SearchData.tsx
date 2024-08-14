"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUIStore } from "@/store";
import { searchProduct } from "@/actions";

export interface SearchResult {
  title: string;
  slug: string;
}

interface Props {
  query: SearchResult[];
  search: string;
}

export const SearchData = ({ search, query }: Props) => {
  const [products, setProducts] = useState<SearchResult[]>(query);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        return;
      }
      try {
        const product = await searchProduct(search);
        setProducts(product ?? query);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setProducts(query);
      }
    };

    fetchData();
  }, [search, query]);

  return (
    <div>
      {search && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-auto z-10">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link
                key={index}
                href={`/product/${product.slug}`}
                onClick={() => closeMenu()}
              >
                <article className="block p-4 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                </article>
              </Link>
            ))
          ) : (
            <li className="p-4 text-gray-500 animate-pulse">Cargando...</li>
          )}
        </ul>
      )}
    </div>
  );
};
