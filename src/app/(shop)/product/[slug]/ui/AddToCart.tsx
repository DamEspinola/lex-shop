"use client";

import React, { useState } from "react";
import { ColorsSelector, QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Size, Product, Colors} from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
  stock: number;
}


export const AddToCart = ({ product, stock }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [colors, setColors] = useState<Colors | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addProductCart = useCartStore((state) => state.addCartProduct);

  const addToCart = () => {
    setPosted(true);
    if (product.sizes.length > 0 && !size) return;
    if (!product.sizes.length && !colors) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      size: size!,
      colors: colors!
    };

    addProductCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
    setColors(undefined);
  };

  return (
    <div>
      {posted && product.sizes.length > 0 && !size && (
        <p className="mt-2 text-red-600">Debe de seleccionar una talla*</p>
      )}

      {posted && !product.sizes.length && !colors && (
        <p className="mt-2 text-red-600">
          Debe de seleccionar un color al menos*
        </p>
      )}
      {/* selector de tallas */}
      {product.sizes.length > 0 ? (
        <SizeSelector
          SelectedSize={size}
          avaliableSize={product.sizes}
          onSizeChanged={setSize}
        />
      ) : (
        <ColorsSelector
          SelectedColor={colors}
          avaliableColor={product.colors}
          onColorChanged={setColors}
        />
      )}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button
        className={`btn-primary my-5 ${
          stock === 0 ? "disabled:bg-slate-300" : ""
        }`}
        disabled={stock === 0}
        onClick={addToCart}
      >
        Agregar al carrito
      </button>
    </div>
  );
};
