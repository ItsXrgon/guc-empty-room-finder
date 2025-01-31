import React, { Suspense } from "react";

import RoomSelect from "./RoomSelect";

export default function RoomsForm() {
	return (
		<Suspense>
			<RoomSelect />
		</Suspense>
	);
}
