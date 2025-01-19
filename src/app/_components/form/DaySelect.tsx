'use client';

import { Day } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Label } from '~/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { DayOptions } from '~/lib/consts';
import { SearchParams } from '~/lib/types';

export default function DaySelect() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleDaySelect = useCallback(
		(day: Day) => {
			const queryParams = new URLSearchParams(
				Array.from(searchParams.entries())
			);

			queryParams.set(SearchParams.Day, day);

			const search = queryParams.toString();
			const query = search ? `?${search}` : '';

			router.push(`${pathname}${query}`);
		},
		[pathname, router, searchParams]
	);

	return (
		<div className="flex flex-col gap-2">
			<Label variant="md">Select day</Label>
			<Select
				onValueChange={handleDaySelect}
				value={searchParams?.get(SearchParams.Day) as Day}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a day" />
				</SelectTrigger>
				<SelectContent>
					{DayOptions.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
