"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import RoomsForm from "./_components/form/rooms/RoomsForm";
import SlotsForm from "./_components/form/slots/SlotsForm";

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const changeActiveTab = useCallback(
		(tab: string) => {
			const queryParams = new URLSearchParams(searchParams);

			queryParams.set("tab", tab);

			const search = queryParams.toString();
			const query = search ? `?${search}` : "";

			router.push(`${pathname}${query}`);
		},
		[pathname, router, searchParams],
	);

	return (
		<Tabs
			defaultValue={searchParams?.get("tab") ?? "slots"}
			onValueChange={changeActiveTab}
		>
			<TabsList className="w-[90vw]">
				<TabsTrigger className="w-full" value="slots">
					By slots
				</TabsTrigger>
				<TabsTrigger className="w-full" value="room">
					By Room
				</TabsTrigger>
			</TabsList>
			<TabsContent value="slots">
				<SlotsForm />
			</TabsContent>
			<TabsContent value="room">
				<RoomsForm />
			</TabsContent>
		</Tabs>
	);
}
