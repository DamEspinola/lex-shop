"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import React, { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    setloaded(true);
  }, []);

  const { itemsCart, iva, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  if (!loaded) return <p>Loading...</p>;
  return (
    <>
      <div className="grid grid-cols-2">
        <span>Nro. Productos</span>
        <span className="text-right">
          {itemsCart === 1 ? `${itemsCart} artículo` : `${itemsCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (10%)</span>
        <span className="text-right">{currencyFormat(iva)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
           {currencyFormat(total)}
        </span>
      </div>
    </>
  );
};
