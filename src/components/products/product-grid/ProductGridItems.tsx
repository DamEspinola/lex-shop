"use client";

import React, { useState } from "react";
import { Product } from "@/interfaces";
import Link from "next/link";
import { ProductImage } from "@/components";

interface Props {
  product: Product;
}

export const ProductGridItems = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link className="hover:text-green-800" href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-green-700"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
