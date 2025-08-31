// hooks/useSearchFilters.ts
import { useState } from 'react';
import {Company} from "@/app/interface/Company";
import {Function as FunctionInterface} from "@/app/interface/Function";

export const useSearchFilters = () => {
    const [filters, setFilters] = useState({
        company: {} as Company,
        name: '',
        code: 0,
        status: true,
        func: {} as FunctionInterface
    });

    const updateFilter = <K extends keyof typeof filters>(
        key: K,
        value: typeof filters[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        updateFilter,
        setCompany: (company: Company) => updateFilter('company', company),
        setName: (name: string) => updateFilter('name', name),
        setCode: (code: number) => updateFilter('code', code),
        setStatus: (status: boolean) => updateFilter('status', status),
        setFunc: (func: FunctionInterface) => updateFilter('func', func),
    };
};