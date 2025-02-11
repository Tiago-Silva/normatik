

export interface Company {
    id: number;
    name: string;
    cnpj: string;
    address: string;
    doctor: string;
    status: boolean;
}

export interface NewCompany {
    name: string;
    cnpj: string;
    address: string;
    doctor: string;
    status: boolean;
}