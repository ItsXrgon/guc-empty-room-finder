import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function RoomListSkeleton() {
	return (
		<>
			<Skeleton className="h-8 mb-1" />
			<Skeleton className="h-8 mb-1" />
			<Skeleton className="h-8 mb-1" />
			<Skeleton className="h-8 mb-1" />
		</>
	);
}
