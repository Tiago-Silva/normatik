import React, { useEffect } from 'react';
import styles from './index.module.css';
import { FaFileAlt, FaSave } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";
import { BusinessGroup } from "@/app/interface/BusinessGroup";
import InputMask from "@/app/components/input/inputMask";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CompanyDTO, NewCompany, Company } from "@/app/interface/Company";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectZod from "@/app/components/select/SelectZod";
import InputZod from "@/app/components/input/InputZod";
import Input from "@/app/components/input/input";
import { CompanyService } from "@/app/service/CompanyService";

const registrationTypeOptions = [
    { value: 'cnpj', label: 'CNPJ' },
    { value: 'cpf', label: 'CPF' },
    { value: 'isento', label: 'ISENTO' },
];

const esocialGroupOptions = [
    { value: 'grupo01', label: 'Grupo 01' },
    { value: 'grupo02', label: 'Grupo 02' },
    { value: 'grupo03', label: 'Grupo 03' },
    { value: 'grupo04', label: 'Grupo 04' },
    { value: 'grupo05', label: 'Grupo 05' },
    // Add more groups as needed
];

export type companyData = z.infer<typeof CompanyDTO>;

interface Props {
    group?: BusinessGroup;
    company?: Company;
    onShowForm: () => void;
    onUpdateCompanyListWhenSaving: () => void;
}

const FormCompany: React.FC<Props> = (
    {
        group,
        company,
        onShowForm,
        onUpdateCompanyListWhenSaving
    }) => {

    const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm<companyData>({
        resolver: zodResolver(CompanyDTO),
        mode: 'onChange',
        defaultValues: {
            businessGroup: group
        }
    });

    useEffect(() => {
        if (company) {
            setValue('name', company.name);
            setValue('cnpj', company.cnpj);
            setValue('doctor', company.doctor);
            setValue('status', company.status);
            setValue('registrationType', company.registrationType);
            setValue('fantasyName', company.fantasyName);
            setValue('cnae', company.cnae);
            setValue('cep', company.cep);
            setValue('rule', company.rule);
            setValue('esocialGroup', company.esocialGroup);
            if (company.businessGroup) {
                setValue('businessGroup', company.businessGroup);
            }
        }
    }, [company, setValue]);

    const handleCreateCompany = async (data: companyData) => {
        const newCompany: NewCompany = {
            name: data.name,
            cnpj: data.cnpj,
            doctor: data.doctor,
            status: data.status || false,
            registrationType: data.registrationType,
            fantasyName: data.fantasyName,
            cnae: data.cnae,
            cep: data.cep,
            rule: data.rule || false,
            esocialGroup: data.esocialGroup,
            businessGroup: data.businessGroup,
        };

        const service = new CompanyService();
        try {
            await service.createCompany(newCompany);
            onUpdateCompanyListWhenSaving();
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    const handleEditCompany = async (data: companyData) => {
        const updatedCompany: Company = {
            ...company,
            ...data,
            id: company?.id ?? 1,
            status: data.status ?? true,
            rule: data.rule ?? false,
        };

        const service = new CompanyService();
        try {
            await service.updateCompany(updatedCompany);
            onUpdateCompanyListWhenSaving();
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados da Empresa / Empregador <span>*</span>:</h2>
            <form onSubmit={handleSubmit(company ? handleEditCompany : handleCreateCompany)}>

                <Input
                    label={'Grupo/Cliente:'}
                    disabled={true}
                    value={group?.name || ''}
                    onChange={() => {}}
                />

                <SelectZod
                    label={'Tipo de inscrição no eSocial:'}
                    options={registrationTypeOptions}
                    width={'300px'}
                    register={register('registrationType')}
                    error={errors.registrationType}
                />

                <InputMask label={'CNPJ:'} mask={['99.999.999/9999-99']} register={register} name={'cnpj'} error={errors?.cnpj}/>
                <InputZod label={'Razão Social:'} register={register('name')} error={errors?.name} />
                <InputZod label={'Nome Fantasia:'} register={register('fantasyName')} error={errors?.fantasyName} />
                <InputMask label={'CNAE:'} mask={['99.99-9']} register={register} name={'cnae'} error={errors?.cnae}/>
                <InputMask label={'CEP:'} mask={['99999-999']} register={register} name={'cep'} error={errors?.cep}/>
                <InputZod label={'Médico Responsável:'} register={register('doctor')} error={errors?.doctor} />
                <ToggleSwitch
                    label={'Aplicar regra básica do PCMSO - (NR7):'}
                    name={'rule'}
                    isChecked={false}
                    setValue={setValue}
                    register={register('rule')}
                />

                <SelectZod
                    label={'Grupo do eSocial'}
                    options={esocialGroupOptions}
                    width={'300px'}
                    register={register('esocialGroup')}
                    error={errors.esocialGroup}
                />

                <ToggleSwitch
                    label={'Status da empresa:'}
                    name={'status'}
                    isChecked={true}
                    setValue={setValue}
                    register={register('status')}
                />
                <div className={styles.wrapperButton}>
                    <Button
                        title={company ? 'Alterar' : 'Salvar'}
                        icon={FaSave}
                        width={'250px'}
                        background={'#295A9C'}
                        disabled={!isValid}
                        type={'submit'}
                    />

                    <Button
                        title={'Cancelar/Voltar'}
                        icon={FaSave}
                        onClick={onShowForm}
                        width={'200px'}
                        background={'#ddd'}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormCompany;