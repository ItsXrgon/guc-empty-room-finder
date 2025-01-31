import React from 'react';
import { Label } from '~/components/ui/label';

export default function Header() {
	return (
		<header className="flex flex-col items-center justify-center w-full py-3">
			<Label variant="lg">Find empty rooms in GUC</Label>
		</header>
	);
}
