import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		POSTGRES_URL_NON_POOLING: z.string().url(),
		POSTGRES_USER: z.string(),
		POSTGRES_HOST: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_DATABASE: z.string(),
		POSTGRES_URL_NO_SSL: z.string().url(),
		POSTGRES_PRISMA_URL: z.string().url(),
		PORTAL_USERNAME: z.string(),
		PORTAL_PASSWORD: z.string(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
		POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		PORTAL_USERNAME: process.env.PORTAL_USERNAME,
		PORTAL_PASSWORD: process.env.PORTAL_PASSWORD,
		NODE_ENV: process.env.NODE_ENV,
	},
	skipValidation: false,
	emptyStringAsUndefined: true,
});
