import React from 'react';
import styles from "./index.module.css";
import {FaBuilding} from "react-icons/fa";

interface Props {
    isShow: boolean;
    onClickButton: () => void;
}

const HeaderSector = () => {
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.wrapperTitle}>
                    <FaBuilding /> <h1 className={styles.title}>Empresa / Empregador</h1>
                </div>
                <h5 className={styles.subTitle}>Gerencie as empresas e/ou empregadores cadastrados em sua assunatura</h5>
            </div>

            {/*{!isShow && (*/}
            {/*    <div className={styles.right}>*/}
            {/*        <Button*/}
            {/*            title={'Cadastrar'}*/}
            {/*            icon={FaPlus}*/}
            {/*            background={'#31b331'}*/}
            {/*            onClick={onClickButton}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default HeaderSector;