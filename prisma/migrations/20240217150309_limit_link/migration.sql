/*
  Warnings:

  - You are about to drop the column `shortener` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_shortener_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "limit" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "shortener";
