/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Code_name_key" ON "Code"("name");
