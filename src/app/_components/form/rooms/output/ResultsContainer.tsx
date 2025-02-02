import React, { PropsWithChildren } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function ResultsContainer({ children }: PropsWithChildren) {
	return (
		<ScrollArea className="flex flex-col gap-1 border border-solid p-1 rounded-lg">
			{children}
		</ScrollArea>
	);
}
