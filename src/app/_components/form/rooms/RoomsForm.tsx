import React, { Suspense } from "react";
import { Separator } from "~/components/ui/separator";

import DaySelect from "../shared/input/DaySelect";
import RoomInput from "./input/RoomInput";
import Result from "./output/Result";

export default function RoomsForm() {
	return (
		<div className="flex flex-col gap-4">
			<Suspense>
				<RoomInput />
				<DaySelect />
				<Separator />
				<Result />
			</Suspense>
		</div>
	);
}
