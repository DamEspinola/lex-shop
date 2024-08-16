"use client";

import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Search } from "..";
import { GrPrevious } from "react-icons/gr";

export const SearchOverlay = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="relative flex items-center">
      <button onClick={toggleSearch} className="mx-2">
        {showSearch ? <GrPrevious size={20} /> : <IoSearchOutline size={20} />}
      </button>

      {showSearch && (
        <div className="flex items-center">
          <Search />
        </div>
      )}
    </div>
  );
};
