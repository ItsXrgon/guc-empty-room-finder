export type TScrapedDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Saturday';
export type TScrapedSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; 

export type TScrapedTableCell = {
	day: TScrapedDay;
	slot: TScrapedSlot;
	rooms: string[];
};

export type TBatchData = {
	course: string;
	schedule: TScrapedTableCell[];
};