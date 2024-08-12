import prisma from "./../lib/prisma";
import { initialData } from "./seed";
import { country } from "./seed.country";

async function main() {
  // 1.  Borrar registros previos
  // await Promise.all([

    await prisma.orderAddress.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  // ]);
  console.log("seed ejecutado correctamente");

   // country
   
   await prisma.country.createMany({
    data: country // <- en caso de muchos paises usar el "countries" en vez de "country"
   })

  // 2. categorias
  const { category, products, users } = initialData;
  await prisma.user.createMany({
    data: users
  })
  const categoryData = category.map((name) => ({ name }));


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
