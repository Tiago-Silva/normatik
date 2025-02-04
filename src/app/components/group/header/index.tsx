import React from 'react';
import styles from "./index.module.css";
import {FaBuilding, FaPlus, FaQuestionCircle} from "react-icons/fa";
import Button from "@/app/components/button/button";

const HeaderGroup = () => {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.wrapperTitle}>
                    <FaBuilding /> <h1 className={styles.title}>Grupos Empresariais / Clientes</h1> <FaQuestionCircle style={{ color: 'green' }} />
                </div>
                <h5 className={styles.subTitle}>Gerencie os grupos de empresas/cliente cadastrados em sua assinatura</h5>
            </div>

            <div className={styles.right}>
                <Button
                    title={'Cadastrar'}
                    icon={FaPlus}
                    background={'#31b331'}
                />
            </div>

        </div>
    );
};

export default HeaderGroup;