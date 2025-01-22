-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trx_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "transaction_description" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "routing_number" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_trx_id_key" ON "transaction"("trx_id");
