// src/app/interface/Company.ts

import { BusinessGroup } from './BusinessGroup';

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