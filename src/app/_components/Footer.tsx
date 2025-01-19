import React from 'react';
import { Label } from '~/components/ui/label';

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center pb-1">
			<Label variant="sm">Made with ❤️ by Ali Koheil</Label>
			<a
				href="https://github.com/ItsXrgon/guc-empty-room-finder"
				target="_blank"
				rel="noreferrer noopener"
			>
				<Label variant="sm" className="text-blue-500">
					Github repo for nerds
				</Label>
			</a>
		</footer>
	);
}
