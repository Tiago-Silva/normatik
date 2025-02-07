import React from 'react';
import styles from './group.module.css';
import CompanyComponent from '@/app/components/company/group';

const Company = () => {
    return (
        <div className={styles.container}>

            <CompanyComponent />

        </div>
    );
};

export default Company;