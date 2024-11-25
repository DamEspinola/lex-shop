export const revalidate = 60; // <- 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, SlideShow, Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";
import StanleyImg from "../../../public/imgs/Home-Stanley.webp";
import IphoneImg from "../../../public/imgs/Apple-iPhone-15-Pro.jpg";
// import SlideImg from "@/components/product/slideshow/SlideImg";

interface Props {
  searchParams: {
    page?: string;
  };
}
export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between  ">
        <Image
          alt="StanleyImg"
          src={StanleyImg}
          className="w-[820px] my-9 h-[300px] rounded-2xl bg-cover object-cover"
        />
        <Image
          alt="IphoneImg"
          src={IphoneImg}
          className="w-min my-9 m-3 h-[300px] rounded-2xl bg-cover object-cover"
        />
      </div>
      {/* <SlideImg /> */}
      <Title
        title="Mas visitados"
        subtitle="Todos los productos"
        className="mb-5"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
