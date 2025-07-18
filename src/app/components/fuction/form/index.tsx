import React from 'react';
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
import {Function, FunctionDTO, NewFunction} from "@/app/interface/Function";
import {FunctionService} from "@/app/service/FunctionService";

export type functionData = z.infer<typeof FunctionDTO>;

interface Props {
    group?: BusinessGroup;
    company?: Company;
    func?: Function;
    onShowForm: () => void;
    onUpdateSectorListWhenSaving: () => void;
}

const FormFunction: React.FC<Props> = (
    {
        company,
        func,
        onShowForm,
        onUpdateSectorListWhenSaving,
    }) => {

    const {register, setValue, handleSubmit, formState: {errors, isValid}} = useForm<functionData>({
        resolver: zodResolver(FunctionDTO),
        mode: 'onChange',
        defaultValues: {
            company: company,
            code: 0
        }
    });

    const handleCreateFunction = async (data: functionData) => {
        const newFunction: NewFunction = {
            name: data.name,
            description: data.description,
            code: data.code,
            cbo: data.cbo,
            status: data.status || true,
            companyId: data.company.id,
            createdAt: new Date()
        }

        const service = new FunctionService();
        try {
            console.log('newFunction: ', JSON.stringify(newFunction));
            await service.createFunction(newFunction);
            onUpdateSectorListWhenSaving();
        } catch (error) {
            console.error('Error creating function', error);
        }
    };

    // const handleEditSector = async (data: functionData) => {
        // if (!company || !sector) {
        //     throw new Error('Empresa ou setor não definidos');
        // }
        //
        // const updateSector: Omit<Sector, 'company'> = {
        //     ...sector,
        //     ...data,
        //     companyId: company.id,
        //     updatedAt: new Date(),
        // };
        //
        // const service = new SectorService();
        // onUpdateSectorListWhenSaving();
        // try {
        //     await service.updateSector(updateSector);
        // } catch (error) {
        //     console.error('Error updating sector', error);
        // }
    // };

    // useEffect(() => {
    //     if (sector) {
    //         setValue('nameRef', sector.nameRef);
    //         setValue('internalCode', sector.internalCode);
    //         setValue('description', sector.description);
    //         setValue('sendDescription', sector.sendDescription);
    //         setValue('includeBuilding', sector.includeBuilding);
    //         setValue('status', sector.status);
    //     }
    // }, [sector, setValue]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt/> Dados da Função <span>*</span>:</h2>
            <form onSubmit={handleSubmit(handleCreateFunction)}>

                <Input
                    label={'Empresa:'}
                    disabled={true}
                    value={company?.name || ''}
                    onChange={() => {
                    }}
                />

                <InputZod label={'Nome/Referência:'} register={register('name')} error={errors?.name}/>
                <InputZod label={'Código interno:'} register={register('code', { valueAsNumber: true })} error={errors?.code} type={'number'}/>
                <InputZod label={'Descrição:'} register={register('description')} error={errors?.description}/>
                <InputZod label={'C.B.O:'} register={register('cbo')} error={errors?.description}/>


                <ToggleSwitchZod
                    label={'Status da Função:'}
                    name={'status'}
                    isChecked={func?.status || true}
                    setValue={setValue}
                    register={register('status')}
                />
                <div className={styles.wrapperButton}>
                    <Button
                        title={func?.id ? 'Alterar' : 'Salvar'}
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