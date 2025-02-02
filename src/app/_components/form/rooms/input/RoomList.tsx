"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import { SearchParams } from "~/lib/types";
import { api } from "~/trpc/react";

import RoomListSkeleton from "./RoomListSkeleton";
import RoomsListEmptyState from "./RoomsListEmptyState";

export function RoomList({ setOpen }: { setOpen: (open: boolean) => void }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { data: rooms, isPending } = api.room.showAllRooms.useQuery();

	const handleSelectRoom = useCallback(
		(room: string) => {
			const queryParams = new URLSearchParams(searchParams);
			queryParams.set(SearchParams.Room, room);

			const search = queryParams.toString();
			const query = search ? `?${search}` : "";
			router.push(`${pathname}${query}`);
			setOpen(false);
		},
		[pathname, router, searchParams, setOpen],
	);

	return (
		<Command className="w-full">
			<CommandInput placeholder="Filter rooms..." />
			<CommandList>
				{isPending ? <RoomListSkeleton /> : <RoomsListEmptyState />}
				<CommandGroup>
					{rooms?.map((room) => (
						<CommandItem
							key={room.id}
							value={room.name}
							onSelect={() => handleSelectRoom(room.name)}
						>
							{room.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
