/*
  Warnings:

  - You are about to drop the column `done` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "done",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
