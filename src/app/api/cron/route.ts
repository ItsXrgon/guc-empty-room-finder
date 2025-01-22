import { NextRequest, NextResponse } from 'next/server';
import { env } from '~/env';
import { createCaller } from '~/server/api/root';

export async function GET(request: NextRequest) {
	const isVercelCron = request.headers.get('x-vercel-cron') === '1';

	if (!isVercelCron) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const authHeader = request.headers.get('authorization');

	if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	// @ts-expect-error Context is ignored as we're just triggering the scraper
	const caller = createCaller({});
	try {
		await caller.scraper.trigger();
		return NextResponse.json({ message: 'Success' }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
