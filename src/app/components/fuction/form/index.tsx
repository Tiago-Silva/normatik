import React, {useEffect} from 'react';
import styles from './index.module.css';
import {FaFileAlt, FaSave} from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitchZod from "@/app/components/toggleSwitch/toggleSwitchZod";
import {BusinessGroup} from "@/app/interface/BusinessGroup";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {Company} from "@/app/interface/Company";
import {zodResolver} from "@hookform/resolvers/zod";
import InputZod from "@/app/components/input/InputZod";
import Input from "@/app/components/input/input";
import {NewSector, Sector, SectorDTO} from "@/app/interface/Sector";
import {SectorService} from "@/app/service/SectorService";

export type sectorData = z.infer<typeof SectorDTO>;

interface Props {
    group?: BusinessGroup;
    company?: Company;
    sector?: Sector;
    onShowForm: () => void;
    onUpdateSectorListWhenSaving: () => void;
}

const FormFunction: React.FC<Props> = (
    {
        company,
        sector,
        onShowForm,
        onUpdateSectorListWhenSaving,
    }) => {

    const {register, setValue, handleSubmit, formState: {errors, isValid}} = useForm<sectorData>({
        resolver: zodResolver(SectorDTO),
        mode: 'onChange',
        defaultValues: {
            company: company
        }
    });

    const handleCreateSector = async (data: sectorData) => {
        const newSector: NewSector = {
            name: data.nameRef,
            description: data.description,
            nameRef: data.nameRef,
            internalCode: data.internalCode,
            status: data.status || true,
            sendDescription: data.sendDescription || false,
            includeBuilding: data.includeBuilding || false,
            companyId: data.company.id,
            createdAt: new Date()
        }

        const service = new SectorService();
        try {
            console.log('newSector: ', JSON.stringify(newSector));
            await service.createSector(newSector);
            onUpdateSectorListWhenSaving();
        } catch (error) {
            console.error('Error creating sector', error);
        }
    };

    const handleEditSector = async (data: sectorData) => {
        if (!company || !sector) {
            throw new Error('Empresa ou setor não definidos');
        }

        const updateSector: Omit<Sector, 'company'> = {
            ...sector,
            ...data,
            companyId: company.id,
            updatedAt: new Date(),
        };

        const service = new SectorService();
        onUpdateSectorListWhenSaving();
        try {
            await service.updateSector(updateSector);
        } catch (error) {
            console.error('Error updating sector', error);
        }
    };

    useEffect(() => {
        if (sector) {
            setValue('nameRef', sector.nameRef);
            setValue('internalCode', sector.internalCode);
            setValue('description', sector.description);
            setValue('sendDescription', sector.sendDescription);
            setValue('includeBuilding', sector.includeBuilding);
            setValue('status', sector.status);
        }
    }, [sector, setValue]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt/> Dados da Função <span>*</span>:</h2>
            <form onSubmit={handleSubmit(sector?.id ? handleEditSector : handleCreateSector)}>

                <Input
                    label={'Empresa:'}
                    disabled={true}
                    value={company?.name || ''}
                    onChange={() => {
                    }}
                />

                <InputZod label={'Nome/Referência:'} register={register('nameRef')} error={errors?.nameRef}/>
                <InputZod label={'Código interno:'} register={register('code')} error={errors?.internalCode}/>
                <InputZod label={'Descrição:'} register={register('description')} error={errors?.description}/>
                <InputZod label={'C.B.O:'} register={register('cbo')} error={errors?.description}/>


                <ToggleSwitchZod
                    label={'Status da Função:'}
                    name={'status'}
                    isChecked={sector?.status || true}
                    setValue={setValue}
                    register={register('status')}
                />
                <div className={styles.wrapperButton}>
                    <Button
                        title={sector?.id ? 'Alterar' : 'Salvar'}
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

export default FormFunction;