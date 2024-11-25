"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QueryProduct, SearchData } from "./SearchData";
import { IoSearchOutline } from "react-icons/io5";

export const Search = ({
  queryParams,
}: {
  queryParams?: {
    query?: QueryProduct[];
  };
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("query") || "");
  const debouncedSearch = useDebouncedCallback(
    (newSearch: string) => {
      console.log(`Searching... ${newSearch}`);

      const params = new URLSearchParams(searchParams);
      if (newSearch) {
        params.set("query", newSearch);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    1000
  );
  const query = queryParams?.query || [];

  const clearSearch = () => {
    setSearch("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
     debouncedSearch(value);
    
  };

  return (
    <div className="relative">
      <IoSearchOutline
        size={20}
        className="absolute top-3 right-3 text-gray-400"
      />
      <input
        className="w-[300px] sm:w-[600px] text-black bg-gray-50 rounded-md pl-4 py-2 pr-4 shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-green-900"
        type="search"
        placeholder="Qué estás buscando hoy?"
        value={search}
        onChange={handleChange}
      />
      <SearchData
        queryProduct={query}
        search={search}
        clearSearch={clearSearch}
      />
    </div>
  );
};
