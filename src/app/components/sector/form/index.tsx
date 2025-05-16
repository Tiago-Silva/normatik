import React from 'react';
import styles from './index.module.css';
import { FaFileAlt, FaSave } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitchZod from "@/app/components/toggleSwitch/toggleSwitchZod";
import { BusinessGroup } from "@/app/interface/BusinessGroup";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Company } from "@/app/interface/Company";
import { zodResolver } from "@hookform/resolvers/zod";
import InputZod from "@/app/components/input/InputZod";
import Input from "@/app/components/input/input";
import {SectorDTO} from "@/app/interface/Sector";

export type sectorData = z.infer<typeof SectorDTO>;

interface Props {
    group?: BusinessGroup;
    company?: Company;
    onShowForm: () => void;
    onUpdateCompanyListWhenSaving: () => void;
}

const FormSector: React.FC<Props> = (
    {
        company,
        onShowForm,
    }) => {

    const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm<sectorData>({
        resolver: zodResolver(SectorDTO),
        mode: 'onChange',
    });

    const handleCreateCompany = async (data: sectorData) => {
        console.log(data);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados do Setor <span>*</span>:</h2>
            <form onSubmit={handleSubmit(handleCreateCompany)}>

                <Input
                    label={'Empresa:'}
                    disabled={true}
                    value={company?.name || ''}
                    onChange={() => {}}
                />

                <InputZod label={'Nome/Referência:'} register={register('nameRef')} error={errors?.nameRef} />
                <InputZod label={'Código interno:'} register={register('internalCode')} error={errors?.internalCode} />
                <InputZod label={'Descrição:'} register={register('description')} error={errors?.description} />

                <ToggleSwitchZod
                    label={'Enviar descrição assim para o eScocial ao invés do nome:'}
                    name={'sendDescription'}
                    isChecked={false}
                    setValue={setValue}
                    register={register('sendDescription')}
                />

                <ToggleSwitchZod
                    label={'Incluir dados da Edificação:'}
                    name={'includeBuilding'}
                    isChecked={false}
                    setValue={setValue}
                    register={register('includeBuilding')}
                />

                <ToggleSwitchZod
                    label={'Status do Setor:'}
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

export default FormSector;