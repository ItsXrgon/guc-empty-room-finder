"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Home() {
	useEffect(() => {
		const handleClick = () => {
			const now = new Date().getTime();

			setTimeout(() => {
				if (new Date().getTime() - now < 1500) {
					window.location.href =
						"https://zeal-dashboard.com/download";
				}
			}, 1000);
		};

		const link = document.getElementById("app-link");
		link?.addEventListener("click", handleClick);

		return () => {
			link?.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<a
			href="zeal-dashboard.com://home"
			id="app-link"
			target="_blank"
			rel="noopener noreferrer"
			className="w-full"
		>
			<Button>Download dashboard app</Button>
		</a>
	);
}
