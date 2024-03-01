-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '30 days';
