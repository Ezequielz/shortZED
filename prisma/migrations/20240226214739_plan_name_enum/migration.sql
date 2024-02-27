/*
  Warnings:

  - Changed the type of `name` on the `Plan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlanName" AS ENUM ('free', 'basico', 'popular', 'super');

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "name",
ADD COLUMN     "name" "PlanName" NOT NULL;
