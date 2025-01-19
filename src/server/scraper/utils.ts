import { PrismaClient, Slot } from '@prisma/client';

const prisma = new PrismaClient();

export async function beginConnection() {
	await prisma.$connect();
}

export async function endConnection() {
	await prisma.$disconnect();
}

export async function insertData(slots: Slot[]) {
	try {
		await prisma.tempSlot.createMany({
			data: slots,
			skipDuplicates: true,
		});
	} catch {}
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
