'use server';

import { PrismaClient } from '@prisma/client';
import { TBatchData } from './types';
import { dayTextEnumMap, slotNumEnumMap } from '~/lib/mappers';

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
 * Loops through the courses provided and inserts their schedules to the database.
 * @param courses schedule data to be inserted
 */
export async function insertData(courses: TBatchData[]) {
	try {
		courses?.forEach((course) => {
			course?.schedule?.forEach((slot) => {
				const day = dayTextEnumMap[slot.day];
				const time = slotNumEnumMap[slot.slot];
				slot.rooms?.forEach(async (room) => {
					const roomId = await insertNewRoom(room);
					await prisma.tempSlot.create({
						data: {
							day,
							time,
							roomId,
						},
					});
				});
			});
		});
	} catch (error) {
		throw error;
	}
}

/**
 * Inserts a new room if it doesn't exist. If it does, returns the ID.
 * @param name Name of the room
 * @returns Room ID
 */
async function insertNewRoom(name: string): Promise<number> {
	try {
		return await prisma.$transaction(async (prisma) => {
			// Check if the room already exists
			const storedRoom = await prisma.room.findFirst({
				where: { name },
			});
			if (storedRoom) {
				return storedRoom.id;
			}

			// Determine area
			let area = 'Unspecified';
			if (name.includes('.')) {
				area = name.slice(0, 4);
			}

			const areaId = await insertNewArea(area);
			const result = await prisma.room.create({
				data: {
					name,
					areaId,
				},
			});

			return result.id;
		});
	} catch (error: unknown) {
		// @ts-expect-error Error handling for duplicate entries
		if (error?.code === 'P2002') {
			const storedRoom = await prisma.room.findFirst({
				where: { name },
			});
			if (storedRoom) {
				return storedRoom.id;
			}
		}
		throw error;
	}
}

/**
 * Inserts a new area if it doesn't exist. If it does, returns the ID.
 * @param name Name of the area
 * @returns Area ID
 */
async function insertNewArea(name: string): Promise<number> {
	try {
		return await prisma.$transaction(async (prisma) => {
			// Check if the area already exists
			const storedArea = await prisma.area.findFirst({
				where: { name },
			});
			if (storedArea) {
				return storedArea.id;
			}

			// Create new area
			const result = await prisma.area.create({
				data: { name },
			});

			return result.id;
		});
	} catch (error: unknown) {
		// @ts-expect-error Error handling for duplicate entries
		if (error?.code === 'P2002') {
			const storedRoom = await prisma.area.findFirst({
				where: { name },
			});
			if (storedRoom) {
				return storedRoom.id;
			}
		}
		throw error;
	}
}

/**
 * Replaces the main table with the temp table. This is done to avoid downtime.
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
