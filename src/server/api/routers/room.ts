import { Day, SlotTime } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
			}),
		)
		.query(async ({ ctx, input }) => {
			const { day, startSlotTime, endSlotTime } = input;

			// Time slots between start and end
			const slotTimes = Object.values(SlotTime).filter(
				(time) => time >= startSlotTime && time <= endSlotTime,
			);

			const rooms = await ctx.db.room.findMany({
				where: {
					slots: {
						none: {
							day: day,
							time: {
								in: slotTimes,
							},
						},
					},
				},
			});

			return rooms;
		}),
	showClosestEmptyRoom: publicProcedure
		.input(
			z.object({
				areaId: z.number(),
				day: z.nativeEnum(Day),
				startSlotTime: z.nativeEnum(SlotTime),
				endSlotTime: z.nativeEnum(SlotTime),
			}),
		)
		.query(({}) => {
			return "Triggered!";
		}),
	showRoomSchedule: publicProcedure
		.input(
			z.object({
				roomId: z.number(),
			}),
		)
		.query(({ ctx, input }) => {
			const schedule = ctx.db.room.findUnique({
				where: {
					id: input.roomId,
				},
				include: {
					slots: true,
				},
			});
			return schedule;
		}),
});
