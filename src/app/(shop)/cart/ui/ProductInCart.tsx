"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductInCart = () => {
  const productsCart = useCartStore((state) => state.cart);
  const updateCartProduct = useCartStore((state) => state.updateCartProduct);
  const removeCartProduct = useCartStore((state) => state.removeCartProduct);
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
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateCartProduct(product, quantity)
              }
            />
            <button
              className="underline mt-3"
              onClick={() => removeCartProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
