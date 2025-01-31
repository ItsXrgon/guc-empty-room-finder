"use client";

import { Day, SlotTime } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";

import ResultRow from "./ResultRow";
import ResultsSkeleton from "./skeletons/ResultsSkeleton";

export default function Result() {
	const searchParams = useSearchParams();

	const enabled =
		searchParams.get("day") !== null &&
		searchParams.get("startSlot") !== null;

	const { data: emptyRooms, isPending } = api.room.showAllEmptyRooms.useQuery(
		{
			day: searchParams.get("day") as Day,
			startSlotTime: searchParams.get("startSlot") as SlotTime,
			endSlotTime: searchParams.get("endSlot") as SlotTime,
		},
		{
			enabled,
		},
	);

	if (isPending) {
		return (
			<ScrollArea>
				<div className="flex flex-col gap-1">
					<ResultsSkeleton />
				</div>
			</ScrollArea>
		);
	}

	return (
		<ScrollArea>
			<div className="flex flex-col gap-1">
				{emptyRooms?.map((room) => (
					<ResultRow key={room.id} value={room.name} />
				))}
			</div>
		</ScrollArea>
	);
}
