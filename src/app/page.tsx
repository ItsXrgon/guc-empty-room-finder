import { api, HydrateClient } from '~/trpc/server';
import Test from './_components/test';

export default async function Home() {
	const res = api.room.showAllEmptyRooms({
		day: 'MONDAY',
		startSlotTime: 'FIRST',
		endSlotTime: 'SECOND',
	});

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col ">
				<Test />
			</main>
		</HydrateClient>
	);
}
