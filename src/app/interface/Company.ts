import { BusinessGroup } from './BusinessGroup';
import { z } from "zod";

export interface Company {
    id: number;
    name: string;
    cnpj: string;
    doctor: string;
    status: boolean;
    registrationType: string;
    fantasyName: string;
    cnae: string;
    cep: string;
    rule: boolean;
    esocialGroup: string;
    businessGroupId?: number;
    businessGroup?: BusinessGroup;
}

export interface NewCompany {
    name: string;
    cnpj: string;
    doctor: string;
    status: boolean;
    registrationType: string;
    fantasyName: string;
    cnae: string;
    cep: string;
    rule: boolean;
    esocialGroup: string;
    businessGroup: BusinessGroup;
}

export const CompanyDTO = z.object({
    name: z.string().min(4, { message: "O nome deve ter pelo menos 4 caracteres" }),
    cnpj: z.string().min(18, { message: "O CNPJ deve ter 18 caracteres" }).max(18, { message: "O CNPJ deve ter 18 caracteres" }),
    doctor: z.string().min(4, { message: "O nome do médico deve ter pelo menos 4 caracteres" }),
    status: z.boolean().optional(),
    registrationType: z.string().min(2, { message: "O tipo de registro deve ter pelo menos 2 caracteres" }),
    fantasyName: z.string().min(4, { message: "O nome fantasia deve ter pelo menos 4 caracteres" }),
    cnae: z.string().min(2, { message: "O CNAE deve ter pelo menos 2 caracteres" }),
    cep: z.string().min(2, { message: "O CEP deve ter pelo menos 2 caracteres" }),
    rule: z.boolean().optional(),
    esocialGroup: z.string().min(2, { message: "O grupo eSocial deve ter pelo menos 2 caracteres" }),
    businessGroup: z.object({
        id: z.number({ required_error: "O ID do grupo empresarial é obrigatório" }),
        name: z.string({ required_error: "O nome do grupo empresarial é obrigatório" }),
        status: z.boolean({ required_error: "O status do grupo empresarial é obrigatório" })
    })
});