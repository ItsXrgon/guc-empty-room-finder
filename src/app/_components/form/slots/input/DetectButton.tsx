"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { useDetectDayAndSlot } from "~/hooks/useDetectDayAndSlot";

export default function DetectButton() {
	const handleDetect = useDetectDayAndSlot();

	return (
		<Button variant="secondary" onClick={handleDetect}>
			Detect Day and Slot
		</Button>
	);
}
