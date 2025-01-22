import { NextRequest } from 'next/server';
import { env } from '~/env';
import { createCaller } from '~/server/api/root';

export default async function GET(request: NextRequest) {
	const isVercelCron = request.headers.get('x-vercel-cron') === '1';

	if (!isVercelCron) {
		return new Response('Unauthorized', { status: 401 });
	}

	const authHeader = request.headers.get('authorization');

	if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	// @ts-expect-error Context is ignored as we're just triggering the scraper
	const caller = createCaller({});
	try {
		await caller.scraper.trigger();
		return new Response('Success', { status: 200 });
	} catch {
		return new Response('Internal Server Error', { status: 500 });
	}
}
