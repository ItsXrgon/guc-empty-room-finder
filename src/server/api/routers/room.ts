import { z } from 'zod';
import { Day, SlotTime } from '@prisma/client';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const roomRouter = createTRPCRouter({
	showAllEmptyRooms: publicProcedure
		.input(
			z.object({
				day: z.nativeEnum(Day),
				startSlotTime: z.nativeEnum(SlotTime),
				endSlotTime: z.nativeEnum(SlotTime),
			})
		)
		.query(({ input }) => {
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
		.query(({ input }) => {
			return 'Triggered!';
		}),
	showRoomSchedule: publicProcedure
		.input(
			z.object({
				roomId: z.number(),
			})
		)
		.query(({ input }) => {
			return 'Triggered!';
		}),
});
