-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);
