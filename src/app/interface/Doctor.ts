// src/app/interface/Doctor.ts

import {z} from "zod";

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

export const DoctorDTO = z.object({
    name: z.string().min(4, { message: "O nome deve ter pelo menos 4 caracteres" }),
    description: z.string().min(4, { message: "A descrição deve ter pelo menos 4 caracteres" }).optional(),
    cpf: z.string().min(14, { message: "O CPF deve ter 14 caracteres" }).max(14, { message: "O CPF deve ter 14 caracteres" }),
    crm: z.string().min(2, { message: "O CRM deve ter pelo menos 2 caracteres" }),
    status: z.boolean().optional(),
});