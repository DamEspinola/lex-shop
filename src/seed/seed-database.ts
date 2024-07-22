import prisma from "./../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1.  Borrar registros previos
  // await Promise.all([

    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  // ]);
  console.log("seed ejecutado correctamente");

  // 2. categorias
  const { categories, products, users } = initialData;
  await prisma.user.createMany({
    data: users
  })
  const categoryData = categories.map((name) => ({ name }));


  await prisma.category.createMany({
    data: categoryData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // <string=Shirt, string=categoryId>

  // productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
      
    });

    // imagenes
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
