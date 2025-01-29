"use server";

import { Page } from "puppeteer-core";

import {
	CLOSE_SELECT_BUTTON,
	COURSE_SELECT_OPTIONS_SELECTOR,
	COURSE_SELECT_SELECTOR,
	OPEN_SELECT_SELECTOR,
} from "./selectors";

/**
 * Extracts the course options from the dropdown.
 * @param page The puppeteer page object
 * @returns
 */
export async function getCourseOptions(page: Page) {
	await page.waitForSelector(OPEN_SELECT_SELECTOR, { timeout: 60000 });

	await page.click(OPEN_SELECT_SELECTOR);
	await page.waitForSelector(COURSE_SELECT_SELECTOR, { timeout: 60000 });

	// Extract option values from the course dropdown
	const optionValues = await page.$$eval(
		COURSE_SELECT_OPTIONS_SELECTOR,
		(options) => options.map((option) => option.value),
	);
	await page.click(CLOSE_SELECT_BUTTON);

	return optionValues;
}
