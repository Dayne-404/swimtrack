interface Student {
    name: string;
    skills: boolean[];
    passed: boolean;
}

export interface Worksheet {
    _id: string;
    instructor: string;
    level: string;
    session: string;
    day: string;
    time: string;
    year: string;
    location: string;
    students: Student[];
    createdAt: string;
    updatedAt: string;
}