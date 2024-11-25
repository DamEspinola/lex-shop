import { Product } from "@/interfaces";
import React from "react";
import { ProductGridItems } from "./ProductGridItems";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
      {products.map((product) => (
        <ProductGridItems product={product} key={product.slug} />
      ))}
    </div>
  );
};
