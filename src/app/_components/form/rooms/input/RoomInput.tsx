import React from "react";
import { Label } from "~/components/ui/label";

import RoomSelect from "./RoomSelect";

export default function RoomInput() {
	return (
		<div className="flex flex-col gap-2">
			<Label variant="md">Select Room</Label>
			<RoomSelect />
		</div>
	);
}
