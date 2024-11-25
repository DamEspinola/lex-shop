"use server";

import prisma from "@/lib/prisma";

export const searchProduct = async (query: string) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },

      select: {
        ProductImage: {
          select: {
            url: true,
          },
        },
        title: true,
        slug: true,
      },
    });
    if (!product) return null;
    return product.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Error en la busqueda");
  }
};
