"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { SearchParams } from "~/lib/types";

export default function SlotTimesCheckbox() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleCheckboxChange = useCallback(() => {
		const queryParams = new URLSearchParams(searchParams);
		const isChecked = queryParams.get("isAA");

		if (isChecked) {
			queryParams.delete("isAA");
		} else {
			queryParams.set("isAA", "1");
		}

		const search = queryParams.toString();
		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
	}, [pathname, router, searchParams]);

	return (
		<div className="flex gap-2 items-center">
			<Checkbox
				id="slot-times-checkbox"
				onCheckedChange={handleCheckboxChange}
				checked={searchParams?.get(SearchParams.isAA) === "1"}
			/>
			<Label variant="sm" htmlFor="slot-times-checkbox">
				Use slot times for Pharmacy, Applied Arts and Law
			</Label>
		</div>
	);
}
