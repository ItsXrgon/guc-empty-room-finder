import React from "react";
import { Separator } from "~/components/ui/separator";

export default function ResultRow({ value }: { value: string }) {
	return (
		<>
			<div
				className="flex w-full items-center justify-center h-7"
				key={"room-" + value}
			>
				{value}
			</div>
			<Separator className="my-2" key={"Separator-" + value} />
		</>
	);
}
