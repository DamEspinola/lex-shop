export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  colors: Colors[];
  slug: string;
  tags: string[];
  title: string;
  storage: Storage[];
  categories: Categories;
  // todo: type
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  colors: Colors;
  size: Size;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

type Categories =
  | "fashion_men"
  | "fashion_women"
  | "fashion_kid"
  | "fashion_unisex"
  | "accessories"
  | "fragances"
  | "appliances"
  | "informatics"
  | "smartphones";

export type Storage = "GB32" | "GB64" | "GB128" | "GB256" | "GB512" | "TB1";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"; // posiblemente sea optional
export type Colors = "BLACK" | "WHITE" | "BLUE" | "PINK" | "RED" | "DEEP_BLUE" | "SPACE_GRAY" | "SILVER";

export type Type =
  | "shirts"
  | "pants"
  | "hoodies"
  | "hats"
  | "smartphone"
  | "notebook"
  | "fragrance";
