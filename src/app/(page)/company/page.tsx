import React from 'react';
import styles from './company.module.css';
import CompanyComponent from "@/app/components/company/companyComponent";

const Company = () => {
    return (
        <div className={styles.container}>

            <CompanyComponent />

        </div>
    );
};

export default Company;