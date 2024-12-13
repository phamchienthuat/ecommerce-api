/*
  Warnings:

  - You are about to drop the column `title` on the `product` table. All the data in the column will be lost.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "title",
ADD COLUMN     "currencyId" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "priceFrom" DECIMAL(65,30),
ADD COLUMN     "priceTo" DECIMAL(65,30),
ADD COLUMN     "promotionPrice" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "product_items" ALTER COLUMN "VAT" DROP NOT NULL,
ALTER COLUMN "SKU" DROP NOT NULL;
