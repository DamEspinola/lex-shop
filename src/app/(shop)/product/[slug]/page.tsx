import {
  MobileSlideShow,
  QuantitySelector,
  SizeSelector,
  SlideShow,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductsByIdPage({ params }: Props) {
  const { slug } = params;

  const products = initialData.products.find(
    (product) => product.slug === slug
  );
  if (!products) {
    notFound();
  }
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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {products.title}
        </h1>
        <p className="text-lg mb-5">${products.price}</p>
        {/* selector de tallas */}
        <SizeSelector
          SelectedSize={products.sizes[0]}
          avaliableSize={products.sizes}
        />
        <QuantitySelector quantity={3} />

        <button className="btn-primary my-5">Agregar al carrito</button>
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{products.description}</p>
      </div>
    </div>
  );
}
