import { HydrateClient, api } from "~/trpc/server";

import Footer from "./_components/Footer";
import Form from "./_components/Form";
import Header from "./_components/Header";
import Test from "./_components/test";

export default function Home() {
	const res = api.room.showAllEmptyRooms({
		day: "MONDAY",
		startSlotTime: "FIRST",
		endSlotTime: "SECOND",
	});

	return (
		<HydrateClient>
			<div className="flex flex-col min-h-screen bg-background-default">
				<Header />
				<main className="flex-grow">
					{/* <Test /> */}
					<Form />
				</main>
				<Footer />
			</div>
		</HydrateClient>
	);
}
