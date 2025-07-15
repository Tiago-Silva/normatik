import {Company} from "@/app/interface/Company";


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
    createdAt: Date;
    companyId: number;
}

export interface SearchFilters {
    company: Company;
    name: string;
    code: string;
    status: boolean;
}

export interface SearchActions {
    onSetCompany: (company: Company) => void;
    onSetName: (name: string) => void;
    onSetCode: (code: string) => void;
    onSelectStatus: (status: boolean) => void;
    onSearchFunctions: (companyId: number, status: boolean) => void;
}

export interface SearchFunctionProps {
    filters: SearchFilters;
    actions: SearchActions;
}