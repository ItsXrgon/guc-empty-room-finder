"use client";

import { Day, SlotTime } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { SearchParams } from "~/lib/types";
import { api } from "~/trpc/react";

import ResultRow from "./ResultRow";
import ResultsContainer from "./ResultsContainer";
import ResultsEmptyState from "./ResultsEmptyState";
import ResultsSkeleton from "./ResultsSkeleton";

export default function Result() {
	const searchParams = useSearchParams();

	const day = useMemo(
		() => searchParams.get(SearchParams.Day) as Day | null,
		[searchParams],
	);

	const startSlotTime = useMemo(
		() => searchParams.get(SearchParams.StartSlot) as SlotTime | null,
		[searchParams],
	);

	const endSlotTime = useMemo(
		() => searchParams.get(SearchParams.EndSlot) as SlotTime | null,
		[searchParams],
	);

	const enabled = useMemo(
		() => day !== null && startSlotTime !== null,
		[day, startSlotTime],
	);

	const { data: emptyRooms, isPending } = api.room.showEmptyRooms.useQuery(
		{
			day: day!,
			startSlotTime: startSlotTime!,
			endSlotTime,
		},
		{
			enabled,
			queryHash: JSON.stringify({
				day,
				startSlotTime,
				endSlotTime,
			}),
		},
	);

	if (!enabled) {
		return <ResultsContainer></ResultsContainer>;
	}

	if (isPending) {
		return (
			<ResultsContainer>
				<ResultsSkeleton />
			</ResultsContainer>
		);
	}

	if (emptyRooms?.length === 0) {
		return (
			<ResultsContainer>
				<ResultsEmptyState />
			</ResultsContainer>
		);
	}
	return (
		<ResultsContainer>
			{emptyRooms?.map((room, index) => (
				<ResultRow
					key={room.id}
					value={room.name}
					isLast={index === emptyRooms.length - 1}
				/>
			))}
		</ResultsContainer>
	);
}
