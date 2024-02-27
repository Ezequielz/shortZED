/*
  Warnings:

  - The values [empresarial] on the enum `PlanName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanName_new" AS ENUM ('free', 'basico', 'popular', 'super');
ALTER TABLE "Plan" ALTER COLUMN "name" TYPE "PlanName_new" USING ("name"::text::"PlanName_new");
ALTER TYPE "PlanName" RENAME TO "PlanName_old";
ALTER TYPE "PlanName_new" RENAME TO "PlanName";
DROP TYPE "PlanName_old";
COMMIT;
