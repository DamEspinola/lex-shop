export const revalidate = 60 // <- 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Categories } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    page?: string;
  };
}

const lables: Record<string, string> = {
  fashion_men: "Hombres",
  fashion_women: "Mujeres",
  fashion_kid: "Niños",
  fashion_unisex: "Varios",
  informatics: "Informática",
  smartphones: "Celular",
  appliances: "Electrodomésticos",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
     page, categories: id as Categories
      });

  if (products.length === 0) {
    redirect("/");
  }
  return (
    <>
      <Title
        title="Tienda"
        subtitle={`Categoria ${lables[id]}`}
        className="mb-5"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
