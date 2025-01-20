import { Day, SlotTime } from '@prisma/client';

export const SlotOptions = [
	{ label: '1st', value: SlotTime.FIRST },
	{ label: '2nd', value: SlotTime.SECOND },
	{ label: '3rd', value: SlotTime.THIRD },
	{ label: '4th', value: SlotTime.FOURTH },
	{ label: '5th', value: SlotTime.FIFTH },
	{ label: '6th', value: SlotTime.SIXTH },
	{ label: '7th', value: SlotTime.SEVENTH },
	{ label: '8th', value: SlotTime.EIGHTH },
] as const;

export const DayOptions = [
	{ label: 'Saturday', value: Day.SATURDAY },
	{ label: 'Sunday', value: Day.SUNDAY },
	{ label: 'Monday', value: Day.MONDAY },
	{ label: 'Tuesday', value: Day.TUESDAY },
	{ label: 'Wednesday', value: Day.WEDNESDAY },
	{ label: 'Thursday', value: Day.THURSDAY },
] as const;

export const slotTimesEng = [
	{
		value: SlotTime.FIRST,
		start: {
			hour: 8,
			minute: 15,
		},
		end: {
			hour: 9,
			minute: 45,
		},
	},
	{
		value: SlotTime.SECOND,
		start: {
			hour: 10,
			minute: 0,
		},
		end: {
			hour: 11,
			minute: 30,
		},
	},
	{
		value: SlotTime.THIRD,
		start: {
			hour: 11,
			minute: 45,
		},
		end: {
			hour: 1,
			minute: 15,
		},
	},
	{
		value: SlotTime.FOURTH,
		start: {
			hour: 1,
			minute: 45,
		},
		end: {
			hour: 3,
			minute: 15,
		},
	},
	{
		value: SlotTime.FIFTH,
		start: {
			hour: 3,
			minute: 45,
		},
		end: {
			hour: 5,
			minute: 15,
		},
	},
];

export const slotTimesAA = [
	{
		value: SlotTime.FIRST,
		start: {
			hour: 8,
			minute: 15,
		},
		end: {
			hour: 9,
			minute: 45,
		},
	},
	{
		value: SlotTime.SECOND,
		start: {
			hour: 10,
			minute: 0,
		},
		end: {
			hour: 11,
			minute: 30,
		},
	},
	{
		value: SlotTime.THIRD,
		start: {
			hour: 12,
			minute: 0,
		},
		end: {
			hour: 1,
			minute: 30,
		},
	},
	{
		value: SlotTime.FOURTH,
		start: {
			hour: 1,
			minute: 45,
		},
		end: {
			hour: 3,
			minute: 15,
		},
	},
	{
		value: SlotTime.FIFTH,
		start: {
			hour: 3,
			minute: 45,
		},
		end: {
			hour: 5,
			minute: 15,
		},
	},
];
