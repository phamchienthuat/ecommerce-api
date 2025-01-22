-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
