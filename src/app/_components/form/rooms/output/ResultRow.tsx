import React from "react";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

export default function ResultRow({
	slot,
	taken,
	isLast,
}: {
	slot: string;
	taken: boolean;
	isLast: boolean;
}) {
	return (
		<>
			<div
				className="flex w-full items-center justify-start h-7 gap-2"
				key={"slot-" + slot}
			>
				<div className="flex w-[20%] items-center justify-center">
					<Label variant="sm">{slot}</Label>
				</div>
				<Separator orientation="vertical" />
				<div className="flex w-[80%] items-center justify-center">
					<Label variant="md">{taken ? "Taken" : "Free"}</Label>
				</div>
			</div>
			{!isLast && (
				<Separator className="my-2" key={"Separator-" + slot} />
			)}
		</>
	);
}
