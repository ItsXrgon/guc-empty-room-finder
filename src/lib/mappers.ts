import { Day, SlotTime } from "@prisma/client";

export const dayNumEnumMap = {
	0: Day.SUNDAY,
	1: Day.MONDAY,
	2: Day.TUESDAY,
	3: Day.WEDNESDAY,
	4: Day.THURSDAY,
	5: Day.FRIDAY,
	6: Day.SATURDAY,
} as const;

export const slotTimeOrder = {
	[SlotTime.FIRST]: 1,
	[SlotTime.SECOND]: 2,
	[SlotTime.THIRD]: 3,
	[SlotTime.FOURTH]: 4,
	[SlotTime.FIFTH]: 5,
	[SlotTime.SIXTH]: 6,
	[SlotTime.SEVENTH]: 7,
	[SlotTime.EIGHTH]: 8,
} as const;

export const slotEnumTextMap = {
	[SlotTime.FIRST]: "1st",
	[SlotTime.SECOND]: "2nd",
	[SlotTime.THIRD]: "3rd",
	[SlotTime.FOURTH]: "4th",
	[SlotTime.FIFTH]: "5th",
	[SlotTime.SIXTH]: "6th",
	[SlotTime.SEVENTH]: "7th",
	[SlotTime.EIGHTH]: "8th",
} as const;
