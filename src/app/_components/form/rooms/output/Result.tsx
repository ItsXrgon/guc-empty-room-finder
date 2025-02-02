"use client";

import { Day, SlotTime } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { slotEnumTextMap } from "~/lib/mappers";
import { SearchParams } from "~/lib/types";
import { api } from "~/trpc/react";

import ResultRow from "./ResultRow";
import ResultsContainer from "./ResultsContainer";
import ResultsSkeleton from "./ResultsSkeleton";

export default function Result() {
	const searchParams = useSearchParams();

	const day = useMemo(
		() => searchParams.get(SearchParams.Day) as Day | null,
		[searchParams],
	);

	const room = useMemo(
		() => searchParams.get(SearchParams.Room) as SlotTime | null,
		[searchParams],
	);

	const enabled = useMemo(() => day !== null && room !== null, [day, room]);

	const { data: schedule, isPending } = api.room.showRoomSchedule.useQuery(
		{
			day: day!,
			room: room!,
		},
		{
			enabled,
			queryHash: JSON.stringify({
				day,
				room,
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

	return (
		<ResultsContainer>
			{Object.values(SlotTime).map((slotTime, index) => {
				const taken =
					schedule?.findIndex((s) => s.time === slotTime) !== -1;
				const isLast = index === Object.values(SlotTime).length - 1;

				return (
					<ResultRow
						key={"slot-" + slotTime}
						slot={slotEnumTextMap[slotTime]}
						taken={taken}
						isLast={isLast}
					/>
				);
			})}
		</ResultsContainer>
	);
}
