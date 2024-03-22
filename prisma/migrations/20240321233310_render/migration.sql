-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "expires" SET DEFAULT now() + interval '1 month';
