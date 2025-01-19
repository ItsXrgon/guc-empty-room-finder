import { createCaller } from "~/server/api/root";

export default async function Test() {
	const caller = createCaller();

	const response = await caller.scraper.trigger({
		password: process.env.PORTAL_PASSWORD ?? "",
	});

	return <div>{response}</div>;
}
