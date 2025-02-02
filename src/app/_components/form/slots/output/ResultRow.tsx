import React, { ReactNode } from "react";
import { Separator } from "~/components/ui/separator";

export default function ResultRow({
	value,
	isLast,
}: {
	value: ReactNode;
	isLast: boolean;
}) {
	return (
		<>
			<div
				className="flex w-full items-center justify-center h-7"
				key={"room-" + value}
			>
				{value}
			</div>
			{!isLast && (
				<Separator className="my-2" key={"Separator-" + value} />
			)}
		</>
	);
}
