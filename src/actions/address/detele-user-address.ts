"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleteAddress = await prisma.userAddress.delete({
      where: { userId },
    });
    return deleteAddress;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "no se pudo eliminar la dirección",
    };
  }
};
