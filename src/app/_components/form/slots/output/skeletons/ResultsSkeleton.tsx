import React, { Fragment } from "react";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function ResultsSkeleton() {
	return Array.from({
		length: 10,
	}).map((_, i) => (
		<Fragment key={"skeleton-container-" + i}>
			<Skeleton className="w-full h-7" />
			<Separator />
		</Fragment>
	));
}
