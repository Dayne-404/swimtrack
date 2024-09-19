import { Worksheet } from "./worksheetType";

export interface Group {
    instructor: string;
    _id: string;
    name: string;
    worksheetIds: string[];
    createdAt: Date;
}

export interface FetchedGroup {
    instructor: string;
    _id: string;
    name: string;
    worksheets: Worksheet[];
    createdAt: Date;
}