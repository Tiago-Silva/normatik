import React from 'react';
import styles from './index.module.css';
import Input from "@/app/components/input/input";
import { FaFileAlt, FaSave, FaTimes } from "react-icons/fa";
import Button from "@/app/components/button/button";
import { BusinessGroupService } from '@/app/service/BusinessGroupService';
import { BusinessGroup } from "@/app/interface/BusinessGroup";
import {useBusinessGroupForm} from "@/app/hooks/useBusinessGroupForm";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";

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
                <ToggleSwitch label={'Status:'} isChecked={status} onClick={handleStatusChange} />

                <div className={styles.wrapperButton}>
                    <Button
                        title={businessGroup ? 'Alterar' : 'Salvar Grupo/Cliente'}
                        icon={FaSave}
                        onClick={handleSave}
                        width={'250px'}
                        background={'#295A9C'}
                        disabled={!isFormValid || isSaving}
                    />

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