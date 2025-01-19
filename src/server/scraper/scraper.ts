import puppeteer from 'puppeteer';

import { beginConnection, endConnection } from './utils';

const OPEN_SELECT_SELECTOR = 'a.icon_link.add_link';
const COURSE_SELECT_SELECTOR = 'select.select-box';
const COURSE_SELECT_OPTIONS_SELECTOR = 'select.select-box option';
const SHOW_BUTTON_SELECTOR = 'input.btn.btn-primary';

export async function getSlots() {
	if (!process.env.PORTAL_USERNAME || !process.env.PORTAL_PASSWORD) {
		throw new Error('Portal credentials not found.');
	}

	beginConnection();

	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
	});

	// Open a new page
	const page = await browser.newPage();

	await page.authenticate({
		username: process.env.PORTAL_USERNAME,
		password: process.env.PORTAL_PASSWORD,
	});
	await page.goto(
		'https://apps.guc.edu.eg/student_ext/Scheduling/SearchAcademicScheduled_001.aspx',
		{
			waitUntil: 'domcontentloaded',
		}
	);

	await page.click(OPEN_SELECT_SELECTOR);
	await page.waitForSelector(COURSE_SELECT_SELECTOR);

	const optionValues = await page.$$eval(
		COURSE_SELECT_OPTIONS_SELECTOR,
		(options) => options.map((option) => option.value)
	);

	for (const value of optionValues) {
		await page.select(COURSE_SELECT_SELECTOR, value);
		console.log(`Selected option with value: ${value}`);

		// await page.click(SHOW_BUTTON_SELECTOR);
	}

	endConnection();
}
