/*
  Warnings:

  - You are about to drop the `UserPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_id_plan_fkey";

-- DropForeignKey
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_id_user_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fechaPlanContratado" TIMESTAMP(3),
ADD COLUMN     "planId" INTEGER;

-- DropTable
DROP TABLE "UserPlan";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
