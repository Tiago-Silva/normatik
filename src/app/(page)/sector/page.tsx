import React from 'react';
import styles from './sector.module.css';
import SectorComponent from "@/app/components/sector/sectorComponent";

const Company = () => {
    return (
        <div className={styles.container}>

            <SectorComponent />

        </div>
    );
};

export default Company;