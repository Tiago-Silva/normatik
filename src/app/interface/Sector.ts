import {z} from "zod";

export interface Sector {
    id: number;
    name: string;
    description: string;
    nameRef: string;
    internalCode: string;
    status: boolean;
    sendDescription: boolean;
    includeBuilding: boolean;
    branchId: string;
    branch: string;
    company: string;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewSector {
    name: string;
    description: string;
    nameRef: string;
    internalCode: string;
    status: boolean;
    sendDescription: boolean;
    includeBuilding: boolean;
    branchId?: string;
    companyId: number;
    createdAt: Date;
}

export const SectorDTO = z.object({
    // name: z.string().min(4, { message: "O nome deve ter pelo menos 4 caracteres" }),
    company: z.object({
        id: z.number({ required_error: "O ID da empresa é obrigatório"}),
    }),
    nameRef: z.string().min(4, { message: "O nome de referência deve ter pelo menos 4 caracteres" }),
    internalCode: z.string({ required_error: "O código interno é obrigatório" }),
    description: z.string().min(4, { message: "A descrição deve ter pelo menos 4 caracteres" }),
    status: z.boolean().optional(),
    sendDescription: z.boolean().optional(),
    includeBuilding: z.boolean().optional(),
});