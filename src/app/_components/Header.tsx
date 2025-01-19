import React from "react";
import { Label } from "~/components/ui/label";

export default function Header() {
	return (
		<header className="flex items-center justify-center w-full py-5">
			<Label variant="lg">Find empty rooms in GUC</Label>
		</header>
	);
}
