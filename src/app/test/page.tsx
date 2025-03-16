"use client";

import { useCallback } from "react";
import { Button } from "~/components/ui/button";

export default function Home() {
	const openApp = useCallback(() => {
		window.location.href = "zeal-dashboard.com://home";
		setTimeout(() => {
			window.location.href = "https://zeal-dashboard.com/download";
		}, 1000);
	}, []);

	return <Button onClick={openApp}>Download dashboard app</Button>;
}
