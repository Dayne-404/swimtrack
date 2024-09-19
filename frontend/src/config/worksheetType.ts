export interface Student {
	name: string;
	skills: boolean[];
	passed: boolean;
}

export interface Worksheet {
	_id: string;
	instructor: Instructor | string;
	level: number;
	session: number;
	day: number;
	time: string;
	year: number;
	location: number;
	students: Student[];
	createdAt: string;
	updatedAt: string;
}

export interface newWorksheet {
	instructor: Instructor | string;
	level: number | null;
	session: number | null;
	day: number | null;
	time: string;
	year: string | number;
	location: number | null;
	students: Student[];
}
