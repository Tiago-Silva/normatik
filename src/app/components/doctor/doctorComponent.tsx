'use client';

import React, { useState } from 'react';
import styles from './doctor-component.module.css';
import SearchDoctor from "./seach/search";
import HeaderDoctor from "./header";

const DoctorComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState<boolean>(true);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className={styles.container}>
            <HeaderDoctor isShow={showForm} onClickButton={handleShowForm} />

            <SearchDoctor
                status={status}
                onSelectStatus={setStatus}
            />
        </div>
    );
};

export default DoctorComponent;