"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { searchProduct } from "@/actions";
import { useUIStore } from "@/store";

interface SearchResult {
  title: string;
  slug: string;
}

interface Props {
  query: SearchResult[];
}

export const Search = ({ query }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<SearchResult[]>(query);

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

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      setSearch(term);
    } else {
      params.delete("query");
      setSearch("");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="relative mt-14 max-w-md mx-auto">
      <IoSearchOutline
        size={20}
        className="absolute top-3 left-3 text-gray-400"
      />

      <input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        type="search"
        placeholder="Buscar"
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full bg-gray-50 rounded-lg pl-10 py-2 pr-4 border border-gray-300 shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
            <li className="p-4 text-gray-500">No se encontraron resultados.</li>
          )}
        </ul>
      )}
    </div>
  );
};
