-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "initialPrice" INTEGER,
ADD COLUMN     "recurringPrice" INTEGER,
ADD COLUMN     "subscriptionLength" INTEGER;
