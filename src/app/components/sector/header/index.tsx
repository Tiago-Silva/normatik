import React from 'react';
import styles from "./index.module.css";
import {FaBuilding, FaPlus} from "react-icons/fa";
import Button from "@/app/components/button/button";

interface Props {
    isShow: boolean;
    onClickButton: () => void;
}

const HeaderSector: React.FC<Props> = ({
    isShow,
    onClickButton,
}) => {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.wrapperTitle}>
                    <FaBuilding /> <h1 className={styles.title}>Setores/Departamentos</h1>
                </div>
                <h5 className={styles.subTitle}>Gerencie os setores cadastrados em sua(s) empresa(s)</h5>
            </div>

            {!isShow && (
                <div className={styles.right}>
                    <Button
                        title={'Cadastrar'}
                        icon={FaPlus}
                        background={'#31b331'}
                        onClick={onClickButton}
                    />
                </div>
            )}
        </div>
    );
};

export default HeaderSector;