import { getCategory, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [product, category] = await Promise.all([ // <- en paralelo
    getProductBySlug(slug),
    getCategory(),
  ]);

  // Todo: new
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} category={category} />
    </>
  );
}
