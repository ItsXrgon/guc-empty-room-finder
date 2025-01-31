"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { SlotOptions } from "~/lib/consts";
import { detectDayAndSlot } from "~/lib/detectDayAndSlot";
import { SearchParams } from "~/lib/types";

export default function DetectButton() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleDetect = useCallback(() => {
		const { day, slot } = detectDayAndSlot({
			isAA: searchParams.get(SearchParams.isAA) === "1",
		});

		if (slot && day !== undefined) {
			const queryParams = new URLSearchParams(searchParams);
			queryParams.set(SearchParams.Day, day);
			queryParams.set(SearchParams.StartSlot, slot);

			if (queryParams.get(SearchParams.EndSlot)) {
				const endSlotIndex = SlotOptions.findIndex(
					(option) =>
						option.value === queryParams.get(SearchParams.EndSlot),
				);
				const startSlotIndex = SlotOptions.findIndex(
					(option) => option.value === slot,
				);
				if (startSlotIndex > endSlotIndex) {
					queryParams.delete(SearchParams.EndSlot);
				}
			}

			const search = queryParams.toString();
			const query = search ? `?${search}` : "";

			router.push(`${pathname}${query}`);
		}
	}, [pathname, router, searchParams]);

	return (
		<Button variant="secondary" onClick={handleDetect}>
			Detect Day and Slot
		</Button>
	);
}
