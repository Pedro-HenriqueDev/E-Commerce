/*
  Warnings:

  - You are about to drop the column `phone` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phone";
