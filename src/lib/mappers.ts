import { Day, SlotTime } from "@prisma/client";

export const DayNumEnumMap = {
	0: Day.SUNDAY,
	1: Day.MONDAY,
	2: Day.TUESDAY,
	3: Day.WEDNESDAY,
	4: Day.THURSDAY,
	5: Day.SATURDAY, // Friday is off
	6: Day.SATURDAY,
};

export const dayTextEnumMap = {
	Sunday: Day.SUNDAY,
	Monday: Day.MONDAY,
	Tuesday: Day.TUESDAY,
	Wednesday: Day.WEDNESDAY,
	Thursday: Day.THURSDAY,
	Saturday: Day.SATURDAY,
};

export const slotNumEnumMap = {
	1: SlotTime.FIRST,
	2: SlotTime.SECOND,
	3: SlotTime.THIRD,
	4: SlotTime.FOURTH,
	5: SlotTime.FIFTH,
	6: SlotTime.SIXTH,
	7: SlotTime.SEVENTH,
	8: SlotTime.EIGHTH,
};
