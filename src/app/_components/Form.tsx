import React from "react";

import DaySelect from "./form/DaySelect";
import DetectButton from "./form/DetectButton";
import EndSlotSelect from "./form/EndSlotSelect";
import SlotTimesCheckbox from "./form/SlotTimesCheckbox";
import StartSlotSelect from "./form/StartSlotSelect";

export default function Form() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<StartSlotSelect />
			<EndSlotSelect />
			<DaySelect />
			<DetectButton />
			<SlotTimesCheckbox />
		</div>
	);
}
