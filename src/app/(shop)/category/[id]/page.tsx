export const revalidate = 60 // <- 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
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
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Varios",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
     page, gender: id as Gender
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
