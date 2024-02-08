/*
  Warnings:

  - A unique constraint covering the columns `[shortener]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortener` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "shortener" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_shortener_key" ON "User"("shortener");
