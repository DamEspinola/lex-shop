"use server";

import prisma from "@/lib/prisma";

export const getCountries = async () => {
  try {
    const country = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return country;
  } catch (error) {
    console.log(error);
    return [];
  }
};
