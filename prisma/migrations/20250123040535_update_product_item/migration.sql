/*
  Warnings:

  - Added the required column `name` to the `product_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_items" ADD COLUMN     "name" TEXT NOT NULL;
