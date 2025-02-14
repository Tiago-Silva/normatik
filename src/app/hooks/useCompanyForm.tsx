// src/app/hooks/useCompanyForm.tsx

import { useState, useEffect } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import { CompanyService } from "@/app/service/CompanyService";
import { NewCompany } from '@/app/interface/Company';

export const useCompanyForm = (initialGroup?: BusinessGroup) => {
    const [formState, setFormState] = useState<NewCompany>({
        businessGroup: initialGroup || { id: 0, name: '', status: false },
        registrationType: 'cnpj',
        cnpj: '',
        name: '',
        fantasyName: '',
        cnae: '',
        cep: '',
        doctor: '',
        status: false,
        rule: false,
        esocialGroup: 'grupo01',
    });

    useEffect(() => {
        if (initialGroup) {
            setFormState(prevState => ({
                ...prevState,
                businessGroup: initialGroup,
                status: initialGroup.status,
            }));
        }
    }, [initialGroup]);

    const handleInputChange = (field: keyof NewCompany) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormState(prevState => ({ ...prevState, [field]: value }));
    };

    const handleSelectChange = (field: keyof NewCompany) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormState(prevState => ({ ...prevState, [field]: value }));
    };

    const handleToggleChange = (field: keyof NewCompany) => () => {
        setFormState(prevState => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const service = new CompanyService();
        try {
            await service.createCompany(formState);
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    return {
        formState,
        handleInputChange,
        handleSelectChange,
        handleToggleChange,
        handleSubmit,
    };
};