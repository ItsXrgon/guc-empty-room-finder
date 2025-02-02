import { Day, SlotTime } from "@prisma/client";
import { z } from "zod";
import { slotTimeOrder } from "~/lib/mappers";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
	showAllRooms: publicProcedure.query(async ({ ctx }) => {
		const rooms = await ctx.db.room.findMany();
		return rooms;
	}),
	showAllRoomsByArea: publicProcedure.query(async ({ ctx }) => {
		const rooms = await ctx.db.room.findMany({
			include: {
				area: true,
			},
		});

		const groupedRooms = rooms.reduce(
			(acc, room) => {
				const areaId = room.areaId;
				if (!acc[areaId]) {
					acc[areaId] = {
						area: room.area,
						rooms: [],
					};
				}
				acc[areaId].rooms.push(room);
				return acc;
			},
			{} as Record<
				string,
				{ area: (typeof rooms)[0]["area"]; rooms: typeof rooms }
			>,
		);

		return Object.values(groupedRooms);
	}),
	showEmptyRooms: publicProcedure
		.input(
			z.object({
				day: z.nativeEnum(Day),
				startSlotTime: z.nativeEnum(SlotTime),
				endSlotTime: z.nativeEnum(SlotTime).nullable(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { day, startSlotTime, endSlotTime } = input;

			const startValue = slotTimeOrder[startSlotTime];
			const endValue = endSlotTime ? slotTimeOrder[endSlotTime] : null;

			// Time slots between start and end
			const slotTimes = Object.values(SlotTime).filter((time) => {
				const value = slotTimeOrder[time];
				if (endValue) {
					return value >= startValue && value <= endValue;
				}
				return value === startValue;
			});

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
				room: z.string(),
				day: z.nativeEnum(Day),
			}),
		)
		.query(async ({ ctx, input }) => {
			const room = await ctx.db.room.findFirst({
				where: {
					name: input.room,
				},
				select: {
					id: true,
				},
			});

			if (!room) {
				throw new Error("Room not found");
			}

			const schedule = await ctx.db.slot.findMany({
				where: {
					roomId: {
						equals: room.id,
					},
					day: {
						equals: input.day,
					},
				},
			});
			return schedule;
		}),
});
