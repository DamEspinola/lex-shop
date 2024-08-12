"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import {
  Category,
  Product,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  category: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  "WHITE",
  "BLUE",
  "PINK",
  "RED",
  "DEEP_BLUE",
  "SPACE_GRAY",
  "SILVER",
];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  colors: string[];
  storage: string[];
  tags: string;
  categories:
    | "fashion_men"
    | "fashion_women"
    | "fashion_kid"
    | "fashion_unisex"
    | "accessories"
    | "fragances"
    | "appliances"
    | "informatics"
    | "smartphones";
  categoryId: string;
  images: FileList;
}

export const ProductForm = ({ product, category }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],
      colors: product.colors ?? [],
      storage: product.storage ?? [],
      images: undefined,
    },
  });

  watch("sizes");
  watch("colors");
  const selectedCategory = watch("categories");

  const isSizeDisable = ![
    "fashion_men",
    "fashion_women",
    "fashion_kid",
    "fashion_unisex",
  ].includes(selectedCategory);

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes")); // <- no acepta duplicado
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onColorChanged = (color: string) => {
    const colors = new Set(getValues("colors")); // <- no acepta duplicado
    colors.has(color) ? colors.delete(color) : colors.add(color);
    setValue("colors", Array.from(colors));
  };

  const onSubmit = async (data: FormInputs) => {
    console.log({ data });

    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString() ?? []);
    formData.append("colors", productToSave.colors.toString() ?? []);
    formData.append("storage", productToSave.storage.toString() ?? []);
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("categories", productToSave.categories);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updateProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("No se pudo actualizar el producto");
      return;
    }

    router.replace(`/admin/product/${updateProduct?.slug}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tipo</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categories", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="fashion_men">Moda para Hombre</option>
            <option value="fashion_women">Moda para Mujer</option>
            <option value="fashion_kid">Moda para Niños</option>
            <option value="fashion_unisex">Moda Unisex</option>
            <option value="accessories">Accesorio</option>
            <option value="smartphones">Celular</option>
            <option value="informatics">Informatica</option>
            <option value="appliances">Electrodomesticos</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {category.map((items) => (
              <option key={items.id} value={items.id}>
                {items.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <div
            className={clsx({
              "cursor-not-allowed hidden": isSizeDisable,
            })}
            style={{
              pointerEvents: isSizeDisable ? "none" : "auto",
            }}
          >
            <span>Tallas</span>
            <div className="flex flex-wrap">
              <Controller
                name="sizes"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        onClick={() => onSizeChanged(size)}
                        className={clsx(
                          "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                          {
                            "bg-green-800 text-white":
                              field.value.includes(size),
                          }
                        )}
                      >
                        <span>{size}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          {/* electronic devices */}
          <div
            className={clsx({
              "cursor-not-allowed hidden": !isSizeDisable,
            })}
            style={{
              pointerEvents: !isSizeDisable ? "none" : "auto",
            }}
          >
            <div className="flex flex-col mb-2">
              <span>Tamaño</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                {...register("storage", { required: true })}
              >
                <option value="">[Seleccione]</option>
                <option value="GB32">32GB</option>
                <option value="GB64">64GB</option>
                <option value="GB128">128GB</option>
                <option value="GB256">256GB</option>
                <option value="GB512">512GB</option>
              </select>
            </div>

            <span>Color</span>
            <div className="flex flex-wrap">
              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap">
                    {colors.map((color) => (
                      <div
                        key={color}
                        onClick={() => onColorChanged(color)}
                        className={clsx(
                          "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-fit transition-all text-center",
                          {
                            "bg-green-800 text-white":
                              field.value.includes(color),
                          }
                        )}
                      >
                        <span>{color}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              {...register("images")}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  src={image.url}
                  width={300}
                  height={300}
                  // className="rounded shadow-md transition-transform duration-500 ease-in-out transform hover:scale-90"
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger rounded-b-xl w-full"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
