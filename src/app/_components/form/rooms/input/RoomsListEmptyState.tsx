import React from "react";
import { CommandEmpty } from "~/components/ui/command";
import { Label } from "~/components/ui/label";

export default function RoomsListEmptyState() {
	return (
		<CommandEmpty>
			<Label variant="md">No Rooms Found!</Label>
		</CommandEmpty>
	);
}
