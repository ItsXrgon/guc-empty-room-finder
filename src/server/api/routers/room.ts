import { Day, SlotTime } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const roomRouter = createTRPCRouter({
	showAllRooms: publicProcedure.query(async ({ ctx }) => {
		const rooms = await ctx.db.room.findMany();

		return rooms;
	}),
	showAllEmptyRooms: publicProcedure
		.input(
			z.object({
				day: z.nativeEnum(Day),
				startSlotTime: z.nativeEnum(SlotTime),
				endSlotTime: z.nativeEnum(SlotTime),
			})
		)
		.query(({}) => {
			return 'Triggered!';
		}),
	showClosestEmptyRoom: publicProcedure
		.input(
			z.object({
				areaId: z.number(),
				day: z.nativeEnum(Day),
				startSlotTime: z.nativeEnum(SlotTime),
				endSlotTime: z.nativeEnum(SlotTime),
			})
		)
		.query(({}) => {
			return 'Triggered!';
		}),
	showRoomSchedule: publicProcedure
		.input(
			z.object({
				roomId: z.number(),
			})
		)
		.query(({}) => {
			return 'Triggered!';
		}),
});
