'use client';

import React from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

export default function SlotTimesCheckbox() {
	return (
		<div className="flex gap-2 items-center">
			<Checkbox id="slot-times-checkbox" />
			<Label variant="sm" htmlFor="slot-times-checkbox">
				Use slot times for Pharmacy, Applied Arts and Law
			</Label>
		</div>
	);
}
