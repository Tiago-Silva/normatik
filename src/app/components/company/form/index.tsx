'use client';

import React from 'react';
import styles from './index.module.css';
import Input from "@/app/components/input/input";
import { FaFileAlt, FaSave } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";
import { BusinessGroup } from "@/app/interface/BusinessGroup";
import Select from "@/app/components/select/select";
import { useCompanyForm } from '@/app/hooks/useCompanyForm';
import InputMask from "@/app/components/input/inputMask";

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

interface Props {
    group?: BusinessGroup;
    onShowForm: () => void;
}

const FormCompany: React.FC<Props> = ({ group, onShowForm }) => {
    const {
        formState,
        handleInputChange,
        handleToggleChange,
        handleSelectChange,
        handleSubmit,
    } = useCompanyForm(group);

    const handleSubmitHere = async (e: React.FormEvent) => {
        await handleSubmit(e);
        onShowForm();
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados da Empresa / Empregador <span>*</span>:</h2>
            <form onSubmit={handleSubmitHere}>
                <Input
                    label={'Grupo/Cliente:'}
                    value={formState.businessGroup.name}
                    onChange={handleInputChange('businessGroup')} disabled={true}/>
                <Select
                    label={'Tipo de inscrição no eSocial:'}
                    options={registrationTypeOptions}
                    value={formState.registrationType}
                    onChange={handleSelectChange('registrationType')}
                    width={'300px'}
                />
                <InputMask label={'CNPJ:'} value={formState.cnpj} onChange={handleInputChange('cnpj')} mask={'__.___.___/____-__'} />
                <Input label={'Razão Social:'} value={formState.name} onChange={handleInputChange('name')}/>
                <Input label={'Nome Fantasia:'} value={formState.fantasyName} onChange={handleInputChange('fantasyName')}/>
                <InputMask label={'CNAE:'} value={formState.cnae} onChange={handleInputChange('cnae')} mask={'__.__-_'} />
                <InputMask label={'CEP:'} value={formState.cep} onChange={handleInputChange('cep')} mask={'_____-___'} />
                <Input label={'Médico Responsável:'} value={formState.doctor} onChange={handleInputChange('doctor')}/>
                <ToggleSwitch label={'Aplicar regra básica do PCMSO - (NR7):'} isChecked={formState.rule} onClick={handleToggleChange('rule')}/>

                <Select
                    label={'Grupo do eSocial'}
                    options={esocialGroupOptions}
                    value={formState.esocialGroup}
                    onChange={handleSelectChange('esocialGroup')}
                    width={'300px'}
                />

                <ToggleSwitch label={'Status da empresa:'} isChecked={formState.status} onClick={handleToggleChange('status')}/>

                <div className={styles.wrapperButton}>
                    <Button
                        title={'Salvar'}
                        icon={FaSave}
                        onClick={() => handleSubmit}
                        width={'250px'}
                        background={'#295A9C'}
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