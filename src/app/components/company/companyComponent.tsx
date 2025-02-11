'use client';

import React, {useState} from 'react';
import styles from './company-component.module.css';
import HeaderCompany from './header';
import SearchCompany from './seach/search';
import FormCompany from "@/app/components/company/form";


const CompanyComponent = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClickButton = () => {
        setShowForm(!showForm);
    };

    return (
        <div className={styles.container}>

            <HeaderCompany />

            {showForm ? (
                <FormCompany onClickButton={handleClickButton} />
            ) : (
                <>
                    <SearchCompany />
                </>
            )}

        </div>
    );
};

export default CompanyComponent;