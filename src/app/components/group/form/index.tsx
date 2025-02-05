import React from 'react';
import styles from './index.module.css';
import Input from "@/app/components/input/input";
import {FaFileAlt, FaSave} from "react-icons/fa";
import Button from "@/app/components/button/button";
import ToggleSwitch from "@/app/components/toggleSwitch/toggleSwitch";

interface Props {
    onClickButton: () => void
}

const FormGroup: React.FC<Props> = ({ onClickButton }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}><FaFileAlt /> Dados do grupo/client <span>*</span>:</h2>
            <form>
                <Input label={'Nome/Referência'} />
                <ToggleSwitch label={'Status:'} />

                <div className={styles.wrapperButton}>
                    <Button
                        title={'Salvar Grupo/Cliente'}
                        icon={FaSave}
                        onClick={() => {}}
                        width={'250px'}
                        background={'#295A9C'}
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