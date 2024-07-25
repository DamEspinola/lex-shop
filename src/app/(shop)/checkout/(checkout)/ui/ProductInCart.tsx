"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProductInCart = () => {
  const productsCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <p>Loading....</p>;
  }
  return (
    <>
      {productsCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100,
            }}
            className="rounded mr-5"
          />
          <div>
            <span>
              {product.size} - {product.title} - ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
