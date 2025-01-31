export const SearchParams = {
	EndSlot: "e",
	StartSlot: "s",
	Day: "d",
	isAA: "aa",
	Room: "r",
} as const;

type SearchParams = (typeof SearchParams)[keyof typeof SearchParams];
