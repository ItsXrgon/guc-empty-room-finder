"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { useDetectData } from "~/hooks/useDetectData";

export default function DetectButton() {
	const handleDetect = useDetectData();

	return (
		<Button variant="secondary" onClick={handleDetect}>
			Detect Day and Slot
		</Button>
	);
}
