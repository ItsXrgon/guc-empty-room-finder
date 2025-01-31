import { Page } from "puppeteer";

import { SCHEDULE_TABLE_SELECTOR } from "./selectors";
import { TScrapedDay, TScrapedSlot, TScrapedTableCell } from "./types";

/**
 * Extracts the slots from the schedule table.
 * @param page The puppeteer page object
 */
export async function getSlots(page: Page) {
	const data = await page.evaluate((SCHEDULE_TABLE_SELECTOR) => {
		const table = document.querySelector(SCHEDULE_TABLE_SELECTOR);
		if (!table) return null;

		const result: TScrapedTableCell[] = [];

		const rows = table.querySelectorAll("tbody tr");

		// Iterate over rows (starting from 1 to skip the header row)
		rows.forEach((row) => {
			const day = row
				.querySelector("th")
				?.textContent?.trim() as TScrapedDay;
			const cells = row.querySelectorAll("td");

			// Iterate over cells
			cells.forEach((cell, cellIndex) => {
				const slotContent = cell.innerHTML.trim(); // Content of the cell
				const slotNumber = (cellIndex + 1) as TScrapedSlot; // Slot number based on column index

				if (slotContent === "&nbsp;") {
					// if Slot is empty
					return;
				}

				const locations: string[] = []; // locations occupied
				let match;

				// Regex to extract locations from the cell content
				const locationRegex =
					/<dt>\s*Location\s*<\/dt>\s*<dd>(.*?)<\/dd>/g;

				while ((match = locationRegex.exec(slotContent)) !== null) {
					locations.push(match?.[1]?.trim() ?? "");
				}

				result.push({
					day,
					slot: slotNumber,
					rooms: locations,
				});
			});
		});

		return result;
	}, SCHEDULE_TABLE_SELECTOR);

	return data || [];
}
