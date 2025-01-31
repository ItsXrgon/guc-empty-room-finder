import React, { Suspense } from "react";

import DaySelect from "./inputs/DaySelect";
import DetectButton from "./inputs/DetectButton";
import EndSlotSelect from "./inputs/EndSlotSelect";
import SlotTimesCheckbox from "./inputs/SlotTimesCheckbox";
import StartSlotSelect from "./inputs/StartSlotSelect";
import Result from "./output/Result";

export default function SlotsForm() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<Suspense>
				<StartSlotSelect />
				<EndSlotSelect />
				<DaySelect />
				<DetectButton />
				<SlotTimesCheckbox />
				<Result />
			</Suspense>
		</div>
	);
}
