/*
  Warnings:

  - A unique constraint covering the columns `[fromAreaId,toAreaId]` on the table `AreaEdge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day,time,roomId]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day,time,roomId]` on the table `TempSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ScrapeTimestamp" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScrapeTimestamp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AreaEdge_fromAreaId_idx" ON "AreaEdge"("fromAreaId");

-- CreateIndex
CREATE UNIQUE INDEX "AreaEdge_fromAreaId_toAreaId_key" ON "AreaEdge"("fromAreaId", "toAreaId");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_day_time_roomId_key" ON "Slot"("day", "time", "roomId");

-- CreateIndex
CREATE UNIQUE INDEX "TempSlot_day_time_roomId_key" ON "TempSlot"("day", "time", "roomId");
