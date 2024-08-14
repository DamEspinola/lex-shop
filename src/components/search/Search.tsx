"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchData } from "./SearchData";
import { IoSearchOutline } from "react-icons/io5";
import { Product } from "@/interfaces";


export const Search = ({
  queryParams,
}: {
  queryParams?: {
    query?: Product[];
  };
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const query = queryParams?.query || [];


  const handleSearch = useDebouncedCallback((query: string) => {
    console.log(`Searching... ${query}`);

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      setSearch(query);
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
        <SearchData query={query} search={search} />
    </div>
  );
};
