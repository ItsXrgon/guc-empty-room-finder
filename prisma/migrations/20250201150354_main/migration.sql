/*
  Warnings:

  - You are about to drop the `EmptyRoomCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScrapeTimestamp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Day" ADD VALUE 'FRIDAY';

-- DropTable
DROP TABLE "EmptyRoomCache";

-- DropTable
DROP TABLE "ScrapeTimestamp";
