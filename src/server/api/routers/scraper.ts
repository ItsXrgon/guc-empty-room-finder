import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { loadSlots } from "~/server/scraper/scraper";

export const scraperRouter = createTRPCRouter({
	trigger: publicProcedure.query(async () => {
		try {
			loadSlots();
			return { success: true, message: "Scraper triggered successfully" };
		} catch (error) {
			console.error("Scraper error:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to trigger scraper",
			});
		}
	}),
});
