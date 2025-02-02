import React, { Suspense } from "react";

import DaySelect from "../shared/input/DaySelect";
import DetectButton from "./input/DetectButton";
import EndSlotSelect from "./input/EndSlotSelect";
import SlotTimesCheckbox from "./input/SlotTimesCheckbox";
import StartSlotSelect from "./input/StartSlotSelect";
import Result from "./output/Result";
import { Separator } from "~/components/ui/separator";

export default function SlotsForm() {
	return (
		<div className="flex flex-col gap-4">
			<Suspense>
				<StartSlotSelect />
				<EndSlotSelect />
				<DaySelect />
				<DetectButton />
				<SlotTimesCheckbox />
				<Separator />
				<Result />
			</Suspense>
		</div>
	);
}
