import React, { Suspense } from 'react';

import DaySelect from './form/DaySelect';
import DetectButton from './form/DetectButton';
import EndSlotSelect from './form/EndSlotSelect';
import SlotTimesCheckbox from './form/SlotTimesCheckbox';
import StartSlotSelect from './form/StartSlotSelect';
import { Skeleton } from '~/components/ui/skeleton';

export default function Form() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<Suspense fallback={<Skeleton className="w-full h-12" />}>
				<StartSlotSelect />
			</Suspense>
			<Suspense fallback={<Skeleton className="w-full h-12" />}>
				<EndSlotSelect />
			</Suspense>
			<Suspense fallback={<Skeleton className="w-full h-12" />}>
				<DaySelect />
			</Suspense>
			<Suspense fallback={<Skeleton className="w-full h-12" />}>
				<DetectButton />
			</Suspense>
			<Suspense fallback={<Skeleton className="w-full h-12" />}>
				<SlotTimesCheckbox />
			</Suspense>
		</div>
	);
}
