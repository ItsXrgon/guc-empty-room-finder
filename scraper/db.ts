import { PrismaClient } from "@prisma/client";

import { dayTextEnumMap, slotNumEnumMap } from "./mappers";
import { TBatchData } from "./types";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const prisma = new PrismaClient();

/**
 * Begins the connection to the database.
 */
export async function beginConnection() {
	await prisma.$connect();
}

/**
 * Ends the connection to the database.
 */
export async function endConnection() {
	await prisma.$disconnect();
}

/**
 * Processes a batch of data with retries
 * @param batch Data batch to process
 * @returns true if successful, false otherwise
 */
export async function processBatch(batch: TBatchData[]): Promise<boolean> {
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			await insertData(batch);
			return true;
		} catch {
			if (attempt < MAX_RETRIES) {
				await new Promise((resolve) =>
					setTimeout(resolve, RETRY_DELAY),
				);
			}
		}
	}
	return false;
}

/**
 * Loops through the courses provided and inserts their schedules to the database.
 * @param courses schedule data to be inserted
 */
export async function insertData(courses: TBatchData[]) {
	if (!courses?.length) {
		return;
	}

	try {
		// Process all courses sequentially
		for (const course of courses) {
			if (!course?.schedule?.length) {
				continue;
			}
			// Process each schedule slot
			for (const slot of course.schedule) {
				if (!slot?.rooms?.length) {
					continue;
				}

				const day = dayTextEnumMap[slot.day];
				const time = slotNumEnumMap[slot.slot];

				// Process each room sequentially to avoid race conditions
				for (const room of slot.rooms) {
					try {
						if (!room) {
							continue;
						}

						const roomId = await insertRoom(room);

						if (roomId == -1) {
							continue;
						}

						await prisma.tempSlot.upsert({
							where: {
								day_time_roomId: {
									day,
									time,
									roomId,
								},
							},
							update: {},
							create: {
								day,
								time,
								roomId,
							},
						});
					} catch (roomError) {
						console.error(
							"Error processing room:",
							room,
							roomError,
						);
					}
				}
			}
		}
	} catch (error) {
		console.error("Error in insertData:", error);
		throw error;
	}
}

/**
 * Inserts a new room if it doesn't exist. If it does, returns the ID.
 * @param name Name of the room
 * @returns Room ID or -1 if operation fails
 */
async function insertRoom(name: string): Promise<number> {
	if (!name || typeof name !== "string") {
		return -1;
	}

	try {
		const area = await getRoomArea(name);
		const areaId = await insertArea(area);

		if (areaId === -1) {
			return -1;
		}

		const room = await prisma.room.upsert({
			where: { name },
			update: {}, // No update needed if the room already exists
			create: {
				name,
				areaId,
			},
		});

		return room.id;
	} catch (error) {
		console.error("Error inserting room:", name, error);
		return -1;
	}
}

/**
 * Inserts a new area if it doesn't exist. If it does, returns the ID.
 * @param name Name of the area
 * @returns Area ID or 0 if operation fails
 */
async function insertArea(name: string): Promise<number> {
	if (!name || typeof name !== "string") {
		return -1;
	}

	try {
		const result = await prisma.area.upsert({
			where: { name },
			update: {},
			create: { name },
		});

		return result.id;
	} catch (error) {
		console.error("Error inserting area:", name, error);
		return -1;
	}
}

/**
 * Replaces the main slot table with the temp slot table.
 * This is done to avoid downtime.
 */
export async function replaceMainTable() {
	await prisma.$transaction(async (tx) => {
		await tx.slot.deleteMany();

		const tempData = await tx.tempSlot.findMany();
		await tx.slot.createMany({
			data: tempData,
		});

		await tx.tempSlot.deleteMany();
	});
}

export async function getRoomArea(room: string) {
	if (room.includes(".")) {
		return room.slice(0, 4);
	} else {
		return "Unspecified";
	}
}
