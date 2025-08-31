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
            await service.createFunction(newFunction);
            onUpdateSectorListWhenSaving();
        } catch (error) {
            console.error('Error creating function', error);
        }
    };

    const handleEditFunction = async (data: functionData) => {
        if (!company || !func) {
            throw new Error('Empresa ou função não definidos');
        }

        const updateFunction: Omit<Function, 'company'> = {
            ...func,
            ...data,
            companyId: company.id,
            updatedAt: new Date(),
            editedBy: 'Tiago'
        };

        const service = new FunctionService();
        try {
            await service.updateFunction(updateFunction);
            onUpdateSectorListWhenSaving();
        } catch (error) {
            console.error('Error updating function', error);
        }
    };

    useEffect(() => {
        if (func) {
            setValue('name', func.name);
            setValue('code', func.code);
            setValue('description', func.description);
            setValue('cbo', func.cbo);
            setValue('status', func.status);
            setValue('company', company || {} as Company);
        }
    }, [func, company, setValue]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt/> Dados da Função <span>*</span>:</h2>
            <form onSubmit={handleSubmit(func?.id ? handleEditFunction : handleCreateFunction)}>

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