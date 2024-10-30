/*
  Warnings:

  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `product_items` table. All the data in the column will be lost.
  - You are about to drop the column `promotion_price` on the `product_items` table. All the data in the column will be lost.
  - You are about to drop the column `attributes_option_id` on the `production_config` table. All the data in the column will be lost.
  - You are about to drop the column `product_item_id` on the `production_config` table. All the data in the column will be lost.
  - Added the required column `attributesOptionId` to the `production_config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productItemId` to the `production_config` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "production_config" DROP CONSTRAINT "production_config_attributes_option_id_fkey";

-- DropForeignKey
ALTER TABLE "production_config" DROP CONSTRAINT "production_config_product_item_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "product_attributes" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_items" DROP COLUMN "image",
DROP COLUMN "promotion_price",
ADD COLUMN     "promotionPrice" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "production_config" DROP COLUMN "attributes_option_id",
DROP COLUMN "product_item_id",
ADD COLUMN     "attributesOptionId" INTEGER NOT NULL,
ADD COLUMN     "productItemId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "production_images" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "productItemId" INTEGER,
    "imageFileName" TEXT NOT NULL,

    CONSTRAINT "production_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "production_config" ADD CONSTRAINT "production_config_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_config" ADD CONSTRAINT "production_config_attributesOptionId_fkey" FOREIGN KEY ("attributesOptionId") REFERENCES "attribute_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_images" ADD CONSTRAINT "production_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_images" ADD CONSTRAINT "production_images_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "product_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
