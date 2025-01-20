'use client';

import React from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/react';

export default function SlotTimesCheckbox() {
	const res = api?.room?.showAllRooms?.useQuery();
	console.log(res);
	
	return (
		<div className="flex gap-2 items-center">
			<Checkbox id="slot-times-checkbox" />
			<Label variant="sm" htmlFor="slot-times-checkbox">
				Use slot times for Pharmacy, Applied Arts and Law
			</Label>
		</div>
	);
}
