import { useState, useEffect } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';

interface FormState {
    groupName: string;
    registrationType: string;
    cnpj: string;
    name: string;
    fantasyName: string;
    cnae: string;
    cep: string;
    doctor: string;
    status: boolean;
    rule: boolean;
    esocialGroup: string;
}

export const useCompanyForm = (initialGroup?: BusinessGroup) => {
    const [formState, setFormState] = useState<FormState>({
        groupName: initialGroup?.name || '',
        registrationType: '',
        cnpj: '',
        name: '',
        fantasyName: '',
        cnae: '',
        cep: '',
        doctor: '',
        status: false,
        rule: false,
        esocialGroup: '',
    });

    useEffect(() => {
        if (initialGroup) {
            setFormState(prevState => ({
                ...prevState,
                groupName: initialGroup.name,
                status: initialGroup.status,
            }));
        }
    }, [initialGroup]);

    const handleInputChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const handleSelectChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormState(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const handleToggleChange = (field: keyof FormState) => () => {
        setFormState(prevState => ({ ...prevState, [field]: !prevState[field] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return {
        formState,
        handleInputChange,
        handleSelectChange,
        handleToggleChange,
        handleSubmit,
    };
};