'use server';

import { Page } from 'puppeteer';
import {
	OPEN_SELECT_SELECTOR,
	COURSE_SELECT_SELECTOR,
	COURSE_SELECT_OPTIONS_SELECTOR,
	CLOSE_SELECT_BUTTON,
} from './selectors';

export async function getCourseOptions(page: Page) {
	await page.waitForSelector(OPEN_SELECT_SELECTOR);
	
	await page.click(OPEN_SELECT_SELECTOR);
	await page.waitForSelector(COURSE_SELECT_SELECTOR);

	// Extract option values from the course dropdown
	const optionValues = await page.$$eval(
		COURSE_SELECT_OPTIONS_SELECTOR,
		(options) => options.map((option) => option.value)
	);
	await page.click(CLOSE_SELECT_BUTTON);

	return optionValues;
}
