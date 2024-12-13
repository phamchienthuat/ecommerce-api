/*
  Warnings:

  - Added the required column `isMain` to the `production_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production_images" ADD COLUMN     "isMain" BOOLEAN NOT NULL;
