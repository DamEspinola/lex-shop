-- CreateEnum
CREATE TYPE "Storage" AS ENUM ('GB32', 'GB64', 'GB128', 'GB256', 'GB512', 'TB1');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "storage" "Storage"[] DEFAULT ARRAY[]::"Storage"[];
