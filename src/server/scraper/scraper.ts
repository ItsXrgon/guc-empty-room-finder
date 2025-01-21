'use server';

import puppeteer from 'puppeteer';

import { getCourseOptions } from './getCourseOptions';
import { getSlots } from './getSlots';
import { loadCourseData } from './loadCourseData';
import { beginConnection, endConnection, insertData } from './db';
import { TBatchData } from './types';
import { env } from '~/env';

const BATCH_SIZE = 10;
let batchData: TBatchData[] = [];

/**
 * Scrapes all the course schedules and inserts the occupied rooms into the database.
 */
export async function loadSlots() {
	if (!env.PORTAL_USERNAME || !env.PORTAL_PASSWORD) {
		throw new Error('Portal credentials not found.');
	}

	beginConnection();

	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	});
	const page = await browser.newPage();

	await page.authenticate({
		username: env.PORTAL_USERNAME,
		password: env.PORTAL_PASSWORD,
	});

	await page.goto(
		'https://apps.guc.edu.eg/student_ext/Scheduling/SearchAcademicScheduled_001.aspx',
		{
			waitUntil: 'domcontentloaded',
		}
	);

	// Extract option values from the course dropdown
	const optionValues = await getCourseOptions(page);

	for (const value of optionValues) {
		await loadCourseData(page, value);
		const tableData = await getSlots(page);

		batchData.push({ course: value, schedule: tableData });

		if (batchData.length >= BATCH_SIZE) {
			await insertData(batchData);
			batchData = []; // Clear the batch
		}
	}

	if (batchData.length > 0) {
		await insertData(batchData);
	}

	await browser.close();
	endConnection();
}
