import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { getSlots } from '~/server/scraper/scraper';

export const scraperRouter = createTRPCRouter({
	trigger: publicProcedure
		.input(z.object({ password: z.string() }))
		.mutation(async ({ input }) => {
			if (input.password !== process.env.PORTAL_PASSWORD) {
				throw new Error('Unauthorized action.');
			}
			try {
				await getSlots();
			} catch (error) {
				console.error(error);
				throw new Error('Failed to trigger scraper.');
			}
			return 'Triggered!';
		}),
});
