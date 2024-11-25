"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchProduct } from "@/actions";
import { ProductImage } from "..";

export interface QueryProduct {
  title: string;
  slug: string;
  images: string[];
}

interface Props {
  queryProduct: QueryProduct[];
  search: string;
  clearSearch: () => void;
}

export const SearchData = ({ search, queryProduct, clearSearch }: Props) => {
  const [products, setProducts] = useState<QueryProduct[]>(queryProduct);

  useEffect(() => {
    const fetchData = async () => {
      if (search.trim().length !== 3) {
        return;
      }
      if (search.trim() === "") {
        return;
      }
      try {
        const product = await searchProduct(search);
        setProducts(product ?? queryProduct);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setProducts(queryProduct);
      }
    };
    fetchData();
  }, [search, queryProduct]);

  return (
    <div>
      {search && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-auto z-10">
          {products.length > 0 ? (
            products.map((product, index) => (
              <li key={index}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => clearSearch()}
                >
                  <article className="flex items-center p-4 hover:bg-gray-100 transition-colors">
                    <ProductImage
                      src={product.images[0]}
                      width={40}
                      height={40}
                      alt="img"
                    />
                    <h3 className="text-lg ml-3 font-normal text-gray-800">
                      {product.title}
                    </h3>
                  </article>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-500 animate-pulse">Cargando...</li>
          )}
        </ul>
      )}
    </div>
  );
};
