-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "roles" "Role" NOT NULL DEFAULT 'user';
