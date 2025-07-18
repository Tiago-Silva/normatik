import {Company} from "@/app/interface/Company";
import {z} from "zod";


export interface Function {
    id: number;
    name: string;
    code: number;
    cbo: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    editedBy: string;
    companyId: number;
    company?: Company;
}

export interface NewFunction {
    name: string;
    code: number;
    cbo: string;
    description: string;
    status: boolean;
    createdAt: Date;
    companyId: number;
}

export interface SearchFilters {
    company: Company;
    name: string;
    code: number;
    status: boolean;
}

export interface SearchActions {
    onSetCompany: (company: Company) => void;
    onSetName: (name: string) => void;
    onSetCode: (code: number) => void;
    onSelectStatus: (status: boolean) => void;
    onSearchFunctions: (companyId: number, status: boolean) => void;
}

export interface SearchFunctionProps {
    filters: SearchFilters;
    actions: SearchActions;
}

export const FunctionDTO = z.object({
    company: z.object({
        id: z.number({ required_error: "O ID da função é obrigatório"}),
    }),
    name: z.string().min(4, { message: "O nome da função deve ter pelo menos 4 caracteres" }),
    code: z.number({ required_error: "O código interno é obrigatório" }),
    description: z.string().min(4, { message: "A descrição deve ter pelo menos 4 caracteres" }),
    cbo: z.string().min(2, { message: "O C.B.O deve ter pelo menos 2 caractreres" }),
    status: z.boolean().optional(),
});