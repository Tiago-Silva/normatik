// hooks/useSearchFilters.ts
import { useState } from 'react';
import {Company} from "@/app/interface/Company";

export const useSearchFilters = () => {
    const [filters, setFilters] = useState({
        company: {} as Company,
        name: '',
        code: '',
        status: true,
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
        setCode: (code: string) => updateFilter('code', code),
        setStatus: (status: boolean) => updateFilter('status', status),
    };
};