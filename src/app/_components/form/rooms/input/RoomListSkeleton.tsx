import React from "react";
import { CommandItem } from "~/components/ui/command";
import { Skeleton } from "~/components/ui/skeleton";

const SKELETON_COUNT = 10;

export default function RoomListSkeleton() {
	return Array.from({
		length: SKELETON_COUNT,
	}).map((_, index) => (
		<CommandItem key={"skeleton-container-" + index}>
			<Skeleton className="w-full h-7" />
		</CommandItem>
	));
}
