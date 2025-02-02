import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

import ResultRow from "./ResultRow";

const SKELETON_COUNT = 10;

export default function ResultsSkeleton() {
	return Array.from({
		length: SKELETON_COUNT,
	}).map((_, index) => (
		<ResultRow
			key={"skeleton-container-" + index}
			value={<Skeleton className="w-full h-full" />}
			isLast={index === SKELETON_COUNT - 1}
		/>
	));
}
