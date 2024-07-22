import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface state {
  cart: CartProduct[];
  addCartProduct: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
  updateCartProduct: (product: CartProduct, quantity: number) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    iva: number;
    total: number;
    itemsCart: number;
  };
}

export const useCartStore = create<state>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      // 1. revisar si ya existe el producto
      addCartProduct: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. se que el producto existe por talla debo de incrementar
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + item.quantity };
          }
          return item;
        });
        set({ cart: updateCartProduct });
      },
      updateCartProduct: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updateCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updateCartProduct });
      },
      removeCartProduct: (product: CartProduct) => {
        const { cart } = get();
        // const removeCartProduct = cart.filter(
        //   (item) => item.id !== product.id || item.size !== product.size
        // );
        set({
          cart: cart.filter(
            (item) => item.id !== product.id || item.size !== product.size
          ),
        });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const iva = subTotal * 0.1;
        const total = subTotal + iva;
        // const itemsCart = getTotalItems()
        const itemsCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotal,
          iva,
          total,
          itemsCart,
        };
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
