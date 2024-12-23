/*
  Warnings:

  - Made the column `currency` on table `InventoryItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InventoryItem" ALTER COLUMN "currency" SET NOT NULL;
