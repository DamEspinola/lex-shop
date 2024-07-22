export const revalidate = 604800; // <- 7 días aprox.

import { getProductBySlug, getStockBySlug } from "@/actions";
import {
  MobileSlideShow,
  QuantitySelector,
  SizeSelector,
  SlideShow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "No se encontro el producto",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "No se encontro el producto",
      description: product?.description ?? "",
      images: [`/products/${product?.images[2]}`],
    },
  };
}

export default async function ProductsByIdPage({ params }: Props) {
  const { slug } = params;

  const products = await getProductBySlug(slug);

  if (!products) {
    notFound();
  }

  const stock = await getStockBySlug(slug);

  return (
    <div className="mt-5 mb-20 grid  grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 ">
        {/* mobile slideShow */}
        <MobileSlideShow
          images={products.images}
          title={products.title}
          className="block md:hidden"
        />

        {/* desktop slideShow */}
        <SlideShow
          images={products.images}
          title={products.title}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={products.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {products.title}
        </h1>
        <p className="text-lg mb-5">${products.price}</p>
        {/* selector de tallas */}
        <AddToCart product={products} stock={stock}/>
        {/* <SizeSelector
          SelectedSize={products.sizes[0]}
          avaliableSize={products.sizes}
        />
        <QuantitySelector quantity={3} />

        <button
          className={`btn-primary my-5 ${
            stock === 0 ? "disabled:bg-slate-300" : ""
          }`}
          disabled={stock === 0}
        >
          Agregar al carrito
        </button> */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{products.description}</p>
      </div>
    </div>
  );
}
