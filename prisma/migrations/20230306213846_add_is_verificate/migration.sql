/*
  Warnings:

  - You are about to drop the column `consultationDate` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `consultationAt` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerificate` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `Doctors` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `isVerificate` to the `Patients` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `Patients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "consultationDate",
ADD COLUMN     "consultationAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Doctors" ADD COLUMN     "isVerificate" BOOLEAN NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "isVerificate" BOOLEAN NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
