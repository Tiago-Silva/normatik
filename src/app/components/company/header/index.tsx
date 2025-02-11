import React from 'react';
import styles from "./index.module.css";
import {FaBuilding} from "react-icons/fa";

const HeaderCompany = () => {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.wrapperTitle}>
                    <FaBuilding /> <h1 className={styles.title}>Empresa / Empregador</h1>
                </div>
                <h5 className={styles.subTitle}>Gerencie as empresas e/ou empregadores cadastrados em sua assunatura</h5>
            </div>
        </div>
    );
};

export default HeaderCompany;