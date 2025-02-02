import { Page } from "puppeteer";

import { dayTextEnumMap } from "./mappers";
import { SCHEDULE_TABLE_SELECTOR } from "./selectors";
import { TScrapedDay, TScrapedSlot, TScrapedTableCell } from "./types";

/**
 * Extracts the slots from the schedule table.
 * @param page The puppeteer page object
 */
export async function getSlots(page: Page) {
	// Wait for the table to be present in the DOM
	try {
		await page.waitForSelector(SCHEDULE_TABLE_SELECTOR, { timeout: 5000 });
	} catch {
		return [];
	}

	const data = await page.evaluate(
		(selector, enumMap) => {
			const table = document.querySelector(selector);
			if (!table) {
				return null;
			}

			const result: TScrapedTableCell[] = [];

			const rows = table.querySelectorAll("tbody tr");

			Array.from(rows).forEach((row) => {
				const dayElement = row.querySelector("th");
				const day = dayElement?.textContent?.trim() as TScrapedDay;
				if (!day || !enumMap[day]) {
					// Some tables are broken and the slots go in same cell as day
					// This is to skip those at the cost of data loss
					return;
				}

				const cells = row.querySelectorAll("td");

				Array.from(cells).forEach((cell, cellIndex) => {
					const slotContent = cell.innerHTML.trim(); // Content of the cell
					const slotNumber = (cellIndex + 1) as TScrapedSlot; // Slot number based on column index

					if (slotContent === "&nbsp;") {
						// if Slot is empty then skip
						return;
					}

					const locations: string[] = [];
					let match;

					// Regex to extract locations from the cell content
					const locationRegex =
						/<dt>\s*Location\s*<\/dt>\s*<dd>(.*?)<\/dd>/g;
					while ((match = locationRegex.exec(slotContent)) !== null) {
						if (match[1]?.trim()) {
							locations.push(match[1].trim());
						}
					}

					if (locations.length > 0) {
						result.push({
							day,
							slot: slotNumber,
							rooms: locations,
						});
					}
				});
			});

			return result;
		},
		SCHEDULE_TABLE_SELECTOR,
		dayTextEnumMap,
	);

	return data ?? [];
}
