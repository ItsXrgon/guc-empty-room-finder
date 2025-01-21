-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY');

-- CreateEnum
CREATE TYPE "SlotTime" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH');

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaEdge" (
    "id" SERIAL NOT NULL,
    "fromAreaId" INTEGER NOT NULL,
    "toAreaId" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "AreaEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "areaId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "day" "Day" NOT NULL,
    "time" "SlotTime" NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempSlot" (
    "id" SERIAL NOT NULL,
    "day" "Day" NOT NULL,
    "time" "SlotTime" NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "TempSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmptyRoomCache" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "startTime" "SlotTime" NOT NULL,
    "endTime" "SlotTime" NOT NULL,
    "roomIds" INTEGER[],

    CONSTRAINT "EmptyRoomCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Area_name_idx" ON "Area"("name");

-- CreateIndex
CREATE INDEX "Room_name_idx" ON "Room"("name");

-- CreateIndex
CREATE INDEX "Slot_day_time_roomId_idx" ON "Slot"("day", "time", "roomId");

-- CreateIndex
CREATE INDEX "TempSlot_day_time_roomId_idx" ON "TempSlot"("day", "time", "roomId");

-- CreateIndex
CREATE INDEX "EmptyRoomCache_key_idx" ON "EmptyRoomCache"("key");

-- AddForeignKey
ALTER TABLE "AreaEdge" ADD CONSTRAINT "AreaEdge_fromAreaId_fkey" FOREIGN KEY ("fromAreaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaEdge" ADD CONSTRAINT "AreaEdge_toAreaId_fkey" FOREIGN KEY ("toAreaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempSlot" ADD CONSTRAINT "TempSlot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
