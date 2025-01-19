import { DayNumEnumMap, slotTimesAA, slotTimesEng } from "./consts";

/**
 * Detect the current day and slot based on the current time.
 * @param {boolean} isAA - Whether to use the timings for Applied Arts, Pharmacy and Managment or not
 * @returns
 */
export function detectDayAndSlot({ isAA = false }: { isAA?: boolean }) {
	const date = new Date();
	const currentDay =
		DayNumEnumMap[date.getDay() as keyof typeof DayNumEnumMap];
	const currentHour = date.getHours();
	const currentMinute = date.getMinutes();

	const timeInMinutes = currentHour * 60 + currentMinute;

	const slotTimes = isAA ? slotTimesAA : slotTimesEng;

	// Find the slot where the current time fits, matching the next slot if between two.
	for (let i = 0; i < slotTimes.length; i++) {
		const slot = slotTimes[i]!;
		const startInMinutes = slot.start.hour * 60 + slot.start.minute;
		const endInMinutes = slot.end.hour * 60 + slot.end.minute;

		// Check if current time is before this slot starts
		if (timeInMinutes < startInMinutes) {
			return {
				day: currentDay,
				slot: slot.value, // Return the upcoming slot
			};
		}

		// If the time falls within the current slot
		if (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) {
			return {
				day: currentDay,
				slot: slot.value,
			};
		}
	}

	// If no slots match, return null (outside defined slot times)
	return {
		day: null,
		slot: null,
	};
}
