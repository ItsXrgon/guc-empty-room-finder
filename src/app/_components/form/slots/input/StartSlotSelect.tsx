"use client";

import { SlotTime } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { SlotOptions } from "~/lib/consts";
import { SearchParams } from "~/lib/types";

export default function StartSlotSelect() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSlotSelect = useCallback(
		(slot: SlotTime) => {
			const queryParams = new URLSearchParams(searchParams);

			queryParams.set(SearchParams.StartSlot, slot);

			const search = queryParams.toString();
			const query = search ? `?${search}` : "";
			router.push(`${pathname}${query}`);
		},
		[pathname, router, searchParams],
	);

	const selectedEndSlotIndex = useMemo(() => {
		const endSlotIdx = SlotOptions.findIndex(
			(option) =>
				option.value === searchParams?.get(SearchParams.EndSlot),
		);
		if (endSlotIdx === -1) {
			return null;
		}
		return endSlotIdx;
	}, [searchParams]);

	return (
		<div className="flex flex-col gap-2">
			<Label variant="md">Select start slot</Label>
			<Select
				onValueChange={(value) => handleSlotSelect(value as SlotTime)}
				value={
					searchParams?.get(SearchParams.StartSlot)
						? (searchParams?.get(
								SearchParams.StartSlot,
							) as SlotTime)
						: undefined
				}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a start slot" />
				</SelectTrigger>
				<SelectContent>
					{SlotOptions.filter((_, index) =>
						selectedEndSlotIndex
							? index <= selectedEndSlotIndex
							: true,
					).map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
