import puppeteer from "puppeteer";

import {
	beginConnection,
	endConnection,
	processBatch,
	replaceMainTable,
} from "./db";
import { getCourseOptions } from "./getCourseOptions";
import { getSlots } from "./getSlots";
import { loadCourseData } from "./loadCourseData";
import { TBatchData } from "./types";

const BATCH_SIZE = 15;

/**
 * Scrapes all the course schedules and inserts the occupied rooms into the database.
 */
export async function scraper() {
	if (!process.env.PORTAL_USERNAME || !process.env.PORTAL_PASSWORD) {
		throw new Error("Portal credentials not found.");
	}

	let browser;
	let currentBatch: TBatchData[] = [];
	const failedCourses: string[] = [];

	try {
		beginConnection();
		browser = await puppeteer.launch({
			headless: process.env.NODE_ENV === "production",
			defaultViewport: null,
			protocolTimeout: 1000000,
		});

		const page = await browser.newPage();
		await page.authenticate({
			username: process.env.PORTAL_USERNAME,
			password: process.env.PORTAL_PASSWORD,
		});

		await page.goto(
			"https://apps.guc.edu.eg/student_ext/Scheduling/SearchAcademicScheduled_001.aspx",
			{
				waitUntil: "domcontentloaded",
				timeout: 30000,
			},
		);

		const optionValues = await getCourseOptions(page);

		for (const value of optionValues) {
			try {
				await loadCourseData(page, value);
				const tableData = await getSlots(page);
				if (!tableData || tableData.length === 0) {
					continue;
				}

				currentBatch.push({ course: value, schedule: tableData });
				if (currentBatch.length >= BATCH_SIZE) {
					const success = await processBatch(currentBatch);
					if (!success) {
						failedCourses.push(
							...currentBatch.map((item) => item.course),
						);
					}
					currentBatch = []; // Clear the batch regardless of success
				}
			} catch {
				failedCourses.push(value);
			}
		}

		// Process remaining items in the last batch
		if (currentBatch.length > 0) {
			const success = await processBatch(currentBatch);
			if (!success) {
				failedCourses.push(...currentBatch.map((item) => item.course));
			}
		}
	} catch (error) {
		console.error("Fatal error in loadSlots:", error);
		throw error;
	} finally {
		if (browser) {
			await browser.close();
		}
		await replaceMainTable();
		endConnection();

		if (failedCourses.length > 0) {
			console.error(
				"Failed to process the following courses:",
				failedCourses,
			);
		}
	}
}
