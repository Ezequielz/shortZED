/*
  Warnings:

  - Made the column `name` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "name" SET NOT NULL;
