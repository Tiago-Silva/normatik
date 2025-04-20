


export interface Sector {
    id: number;
    name: string;
    branchId: string;
    branch: string;
    nameRef: string;
    status: boolean;
}

export interface NewSector {
    name: string;
    branchId: string;
    branch: string;
}