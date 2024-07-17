import type { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  SelectedSize: Size;
  avaliableSize: Size[];
}

export const SizeSelector = ({ SelectedSize, avaliableSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas Disponibles</h3>
      <div className="flex">
        {avaliableSize.map((size) => (
          <button key={size} className={clsx(
            "mx-2 hover:underline text-lg",
            {
              "underline": size === SelectedSize
            }
          )}>
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
