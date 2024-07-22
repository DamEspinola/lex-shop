export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  gender: "men" | "women" | "kid" | "unisex";
}
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size: Size;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
