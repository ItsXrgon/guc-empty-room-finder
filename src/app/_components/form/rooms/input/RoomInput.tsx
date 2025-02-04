import React from "react";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

import RoomSelect from "./RoomSelect";

export default function RoomInput() {

	// Preload the rooms to the cache
	api.room.showAllRooms.useQuery();

	return (
		<div className="flex flex-col gap-2">
			<Label variant="md">Select Room</Label>
			<RoomSelect />
		</div>
	);
}
