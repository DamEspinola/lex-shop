"use client";

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";
import { placeOrder } from "@/actions";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { itemsCart, iva, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
    if (itemsCart === 0) { // validacion si esta vacio los items
      redirect("/empty");
    }
  }, []);

  if (!loaded) {
    <p>Cargando...</p>;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size, // <- este se podria cambiar
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }
    // Todo salio bien
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7">
        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
        <div className="mb-10">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address}</p>
          <p>{address.address2}</p>
          <p>{address.postalCode}</p>
          <p>{address.address2}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p>{address.phone}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

        <div className="grid grid-cols-2">
          <span>Nro. Productos</span>
          <span className="text-right">
            {itemsCart === 1
              ? `${itemsCart} artículo`
              : `${itemsCart} artículos`}
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

        <div className="mt-5 mb-2 w-full">
          <p className="mb-5">
            {/* Disclaimer */}
            <span className="text-xs">
              Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
              <a href="#" className="underline">
                términos y condiciones
              </a>{" "}
              y{" "}
              <a href="#" className="underline">
                política de privacidad
              </a>
            </span>
          </p>

          <p className="text-red-500">{errorMessage}</p>
          <button
            disabled={isPlacingOrder}
            onClick={onPlaceOrder}
            className={clsx({
              "btn-primary": !isPlacingOrder,
              "btn-disable": isPlacingOrder,
            })}
            //    href="/orders/123"
            // className="flex btn-primary justify-center"
          >
            Colocar orden
          </button>
        </div>
      </div>
    </>
  );
};
