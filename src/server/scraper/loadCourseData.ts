"use server";

import { Page } from "puppeteer-core";

import {
	COURSE_SELECT_SELECTOR,
	OPEN_SELECT_SELECTOR,
	SHOW_BUTTON_SELECTOR,
} from "./selectors";

/**
 * Extracts the course options from the course select dropdown.
 * @param page The puppeteer page object
 */
export async function loadCourseData(page: Page, value: string) {
	await page.waitForSelector(OPEN_SELECT_SELECTOR, { timeout: 60000 });
	await page.click(OPEN_SELECT_SELECTOR);

	await page.waitForSelector(COURSE_SELECT_SELECTOR, { timeout: 60000 });
	await page.select(COURSE_SELECT_SELECTOR, value);

	await page.waitForSelector(SHOW_BUTTON_SELECTOR, { timeout: 60000 });
	await page.click(SHOW_BUTTON_SELECTOR);
	await page.waitForNavigation({ timeout: 60000 });
}
