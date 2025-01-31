"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { useMediaQuery } from "~/hooks/use-media-query";
import { SearchParams } from "~/lib/types";

import { RoomList } from "./RoomList";

export default function RoomSelect() {
	const searchParams = useSearchParams();

	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full justify-start">
						{searchParams?.get(SearchParams.Room) ? (
							<>{searchParams?.get(SearchParams.Room)}</>
						) : (
							<>+ Select room</>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<RoomList setOpen={setOpen} />
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-full justify-start">
					{searchParams?.get(SearchParams.Room) ? (
						<>{searchParams?.get(SearchParams.Room)}</>
					) : (
						<>+ Select room</>
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-1/3">
				<DrawerTitle className="sr-only">
					Room select drawer
				</DrawerTitle>
				<div className="mt-4 border-t">
					<RoomList setOpen={setOpen} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
