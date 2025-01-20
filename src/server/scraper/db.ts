'use server';

import { PrismaClient } from '@prisma/client';
import { TScrapedTableCell } from './types';
import { dayTextEnumMap, slotNumEnumMap } from '~/lib/mappers';

const prisma = new PrismaClient();

export async function beginConnection() {
	await prisma.$connect();
}

export async function endConnection() {
	await prisma.$disconnect();
}

export async function insertData(slots: TScrapedTableCell[]) {
	try {
		slots?.forEach((slot) => {
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
	} catch (error) {
		throw error;
	}
}

/**
 * Inserts a new room if doesnt exist. if does exist then return the id.
 * @param name name of the room
 * @returns
 */
async function insertNewRoom(name: string): Promise<number> {
	try {
		const storedRoom = await prisma.room.findFirst({
			where: {
				name: name,
			},
		});
		if (storedRoom) {
			// Room already exists
			return storedRoom.id;
		}

		let area = 'Unspecified';
		if (name.includes('.')) {
			area = name.replace('.', '').slice(0, 3);
		}

		const areaId = await insertNewArea(area);
		const result = await prisma.room.create({
			data: {
				name,
				areaId,
			},
		});
		return result.id;
	} catch (error) {
		throw error;
	}
}

/**
 * Inserts a new area if doesnt exist. if does exist then return the id.
 * @param name name of the area
 * @returns
 */
async function insertNewArea(name: string): Promise<number> {
	try {
		const storedArea = await prisma.area.findFirst({
			where: {
				name: name,
			},
		});
		if (storedArea) {
			// Area already exists
			return storedArea.id;
		}

		const result = await prisma.area.create({
			data: {
				name,
			},
		});
		return result.id;
	} catch (error) {
		throw error;
	}
}

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
