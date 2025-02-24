import React, {useEffect} from 'react';
import styles from './index.module.css';
import { FaFileAlt, FaSave } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitchZod from "@/app/components/toggleSwitch/toggleSwitchZod";
import InputMask from "@/app/components/input/inputMask";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputZod from "@/app/components/input/InputZod";
import {Doctor, DoctorDTO, NewDoctor} from "@/app/interface/Doctor";
import {DoctorService} from "@/app/service/DoctorService";

export type doctorData = z.infer<typeof DoctorDTO>;

interface Props {
    onShowForm: () => void;
    doctor?: Doctor;
    onUpdateCompanyListWhenSaving: () => void;
}

const FormDoctor: React.FC<Props> = (
    {
        onShowForm,
        doctor,
        onUpdateCompanyListWhenSaving
    }) => {

    const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm<doctorData>({
        resolver: zodResolver(DoctorDTO),
        mode: 'onChange',
    });

    const handleCreateDoctor = async (data: doctorData) => {
        const newDoctor: NewDoctor = {
            name: data.name,
            description: data.description,
            cpf: data.cpf,
            CRM: data.crm,
            status: data.status || false,
            createdAt: new Date(),
        };

        const service = new DoctorService();
        try {
            await service.createDoctor(newDoctor);
            onUpdateCompanyListWhenSaving();
        } catch (error) {
            console.error('Error creating doctor:', error);
        }
    };

    const handleEditDoctor = async (data: doctorData) => {
        const updatedDoctor: Doctor = {
            ...doctor,
            ...data,
            id: doctor?.id ?? 1,
            CRM: data.crm ?? doctor?.CRM ?? '',
            status: data.status ?? true,
            createdAt: doctor?.createdAt ?? new Date(),
            updatedAt: new Date(),
        };

        const service = new DoctorService();
        try {
            await service.updateDoctor(updatedDoctor);
            onUpdateCompanyListWhenSaving();
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    useEffect(() => {
        if (doctor) {
            setValue('name', doctor.name);
            setValue('description', doctor.description);
            setValue('cpf', doctor.cpf);
            setValue('crm', doctor.CRM);
            setValue('status', doctor.status);
        }
    }, [doctor, setValue]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados do Médico / Responsável <span>*</span>:</h2>
            <form onSubmit={handleSubmit(doctor ? handleEditDoctor : handleCreateDoctor)}>

                <InputZod label={'Nome:'} register={register('name')} error={errors?.name} />
                <InputZod label={'Descrição:'} register={register('description')} error={errors?.description} />
                <InputMask label={'CPF:'} mask={['999.999.999-99']} register={register} name={'cpf'} error={errors?.cpf}/>
                <InputMask label={'CRM:'} mask={['999.999']} register={register} name={'crm'} error={errors?.crm}/>

                <ToggleSwitchZod
                    label={'Status:'}
                    name={'status'}
                    isChecked={true}
                    setValue={setValue}
                    register={register('status')}
                />

                <div className={styles.wrapperButton}>
                    <Button
                        title={doctor ? 'Alterar' : 'Salvar'}
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

export default FormDoctor;