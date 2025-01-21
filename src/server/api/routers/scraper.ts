import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { loadSlots } from '~/server/scraper/scraper';

export const scraperRouter = createTRPCRouter({
	trigger: publicProcedure.query(async ({}) => {
		try {
			loadSlots();
		} catch (error) {
			console.error(error);
			throw new Error('Failed to trigger scraper.');
		}
		return { message: 'Triggered!' };
	}),
});
