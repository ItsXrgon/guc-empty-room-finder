import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		PORTAL_USERNAME: z.string(),
		PORTAL_PASSWORD: z.string(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		PORTAL_USERNAME: process.env.PORTAL_USERNAME,
		PORTAL_PASSWORD: process.env.PORTAL_PASSWORD,
	},
	skipValidation: false,
	emptyStringAsUndefined: true,
});
