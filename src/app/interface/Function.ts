import {Sector} from "@/app/interface/Sector";


export interface Function {
    id: number;
    name: string;
    code: number;
    cbo: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    editedBy: string;
    sectorId: number;
    sector?: Sector;
}

export interface NewFunction {
    name: string;
    code: number;
    cbo: string;
    description: string;
    createdAt: Date;
    sectorId: number;
}