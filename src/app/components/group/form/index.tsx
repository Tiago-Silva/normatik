import React, { useState } from 'react';
import styles from './index.module.css';
import Input from "@/app/components/input/input";
import { FaFileAlt, FaSave } from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";
import { BusinessGroupService } from '@/app/service/BusinessGroupService';

interface Props {
    onClickButton: () => void
}

const FormGroup: React.FC<Props> = ({ onClickButton }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        const service = new BusinessGroupService();
        await service.createBusinessGroup({ name, status });
        setIsSaving(false);

        await handleGetAllBusinessGroup();
    };

    const handleChecked = () => {
        setStatus(!status);
    };

    const handleGetAllBusinessGroup = async () => {
        const service = new BusinessGroupService();
        const response = await service.getAllBusinessGroups();

        console.log('List: ' + JSON.stringify(response));
    };

    const isFormValid = name.trim() !== '' && status !== null;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados do grupo/client <span>*</span>:</h2>
            <form>
                <Input label={'Nome/Referência'} value={name} onChange={(e) => setName(e.target.value)} />
                <ToggleSwitch label={'Status:'} isChecked={status} onClick={handleChecked} />

                <div className={styles.wrapperButton}>
                    <Button
                        title={'Salvar Grupo/Cliente'}
                        icon={FaSave}
                        onClick={handleSave}
                        width={'250px'}
                        background={'#295A9C'}
                        disabled={!isFormValid || isSaving}
                    />

                    <Button
                        title={'Cancelar/Voltar'}
                        icon={FaSave}
                        onClick={onClickButton}
                        width={'200px'}
                        background={'#ddd'}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormGroup;