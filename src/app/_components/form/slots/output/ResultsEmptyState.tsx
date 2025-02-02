import React from "react";
import { Label } from "~/components/ui/label";

export default function ResultsEmptyState() {
	return (
		<div className="flex items-center justify-center p-10">
			<Label variant="md">No Empty Rooms!</Label>
		</div>
	);
}
