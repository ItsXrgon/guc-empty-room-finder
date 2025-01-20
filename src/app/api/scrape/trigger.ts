import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { createCaller } from '~/server/api/root';

export default async function triggerScraper(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// @ts-expect-error no need for context
	const caller = createCaller({});
	try {
		const { password } = req.body;
		if (!password) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Password is required',
			});
		}
		const user = await caller.scraper.trigger(password);
		res.status(200).json(user);
	} catch (cause) {
		if (cause instanceof TRPCError) {
			// An error from tRPC occurred
			const httpCode = getHTTPStatusCodeFromError(cause);
			return res.status(httpCode).json(cause);
		}
		// Another error occurred
		console.error(cause);
		res.status(500).json({ message: 'Internal server error' });
	}
}
