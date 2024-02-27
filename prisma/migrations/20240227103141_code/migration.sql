/*
  Warnings:

  - You are about to drop the column `planId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_planId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "planId";

-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);
