import React from 'react';
import styles from "./index.module.css";
import {FaBuilding, FaPlus} from "react-icons/fa";
import Button from "@/app/components/button/button";

interface Props {
    isShow: boolean;
    onClickButton: () => void;
}

const HeaderDoctor: React.FC<Props> = ({ isShow, onClickButton }) => {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.wrapperTitle}>
                    <FaBuilding /> <h1 className={styles.title}>Médico Responsável pelo PCMSO</h1>
                </div>
                <h5 className={styles.subTitle}>Cadastro de médico reponsável pelo PCMSO em sua assinatura, para geração de documentos e eventos do eSocial</h5>
            </div>

            {!isShow && (
                <div className={styles.right}>
                    <Button
                        title={'Cadastrar profissional'}
                        icon={FaPlus}
                        background={'#31b331'}
                        onClick={onClickButton}
                        width={'215px'}
                    />
                </div>
            )}
        </div>
    );
};

export default HeaderDoctor;