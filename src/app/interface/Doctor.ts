// src/app/interface/Doctor.ts

export interface Doctor {
    id: number;
    name: string;
    description?: string;
    cpf: string;
    CRM: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewDoctor {
    name: string;
    description?: string;
    cpf: string;
    CRM: string;
    status: boolean;
    createdAt: Date;
}