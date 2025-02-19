import React from 'react';
import styles from './index.module.css';
import Input from "@/app/components/input/input";
import { FaFileAlt, FaSave, FaTimes } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";
import { BusinessGroupService } from '@/app/service/BusinessGroupService';
import { BusinessGroup } from "@/app/interface/BusinessGroup";
import {useBusinessGroupForm} from "@/app/hooks/useBusinessGroupForm";

interface Props {
    onClickButton: () => void;
    onShowForm: () => void;
    businessGroup?: BusinessGroup;
}

const FormGroup: React.FC<Props> = ({ onClickButton, onShowForm, businessGroup }) => {
    const {
        name,
        status,
        isSaving,
        setIsSaving,
        handleNameChange,
        handleStatusChange,
    } = useBusinessGroupForm(businessGroup);

    const handleSave = async () => {
        setIsSaving(true);
        const service = new BusinessGroupService();

        if (businessGroup) {
            await service.updateBusinessGroup({ id: businessGroup.id, name, status });
        } else {
            await service.createBusinessGroup({ name, status });
        }
        setIsSaving(false);
        onShowForm();
    };

    const isFormValid = name.trim() !== '';

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados do grupo/client <span>*</span>:</h2>
            <form>
                <Input label={'Nome/Referência'} value={name} onChange={handleNameChange} />
                {/* {name.length > 0 && name.length < 2 && (
                    <p style={{color: 'red'}}>Nome completo</p>
                )} */}
                <ToggleSwitch label={'Status:'} isChecked={status} onClick={handleStatusChange} />

                <div className={styles.wrapperButton}>
                {name.length > 0 && (
                    <Button
                        title="Salvar"
                        icon={FaSave}
                        onClick={handleSave}
                        width="250px"
                        background="#295A9C"
                        disabled={false}
                    />
                )}
                {name.length < 1 && (
                    <Button
                        title="Salvar"
                        icon={FaSave}
                        onClick={handleSave}
                        width="250px"
                        background="#4a6f9e"
                        disabled={true}
                    />
                )}
                

                <Button
                    title={'Cancelar/Voltar'}
                    icon={FaTimes}
                    onClick={onClickButton}
                    width={'200px'}
                    background={'#ddd'}
                    color={'gray'}
                />
                </div>
            </form>
        </div>
    );
};

export default FormGroup;