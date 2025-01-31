import { Day } from "@prisma/client";

export const DayNumEnumMap = {
	0: Day.SUNDAY,
	1: Day.MONDAY,
	2: Day.TUESDAY,
	3: Day.WEDNESDAY,
	4: Day.THURSDAY,
	5: Day.SATURDAY, // Friday is off
	6: Day.SATURDAY,
};