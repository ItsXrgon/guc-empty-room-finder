import { SlotTime } from "@prisma/client";
import React, { Fragment } from "react";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { slotEnumTextMap } from "~/lib/mappers";

export default function ResultsSkeleton() {
	return Object.values(SlotTime).map((slot, index) => (
		<Fragment key={"skeleton-container-" + index}>
			<div
				className="flex w-full items-center justify-start h-7 gap-2"
				key={"skeleton-" + slot}
			>
				<div className="flex w-[20%] items-center justify-center">
					<Label variant="sm">{slotEnumTextMap[slot]}</Label>
				</div>
				<Separator orientation="vertical" />
				<div className="flex w-[80%] items-center justify-center">
					<Skeleton className="w-full h-6" />
				</div>
			</div>
			{index !== Object.values(SlotTime).length - 1 && (
				<Separator className="my-2" key={"separator-" + slot} />
			)}
		</Fragment>
	));
}
