import React from 'react';
import styles from './doctor.module.css';
import DoctorComponent from "@/app/components/doctor/doctorComponent";

const Company = () => {
    return (
        <div className={styles.container}>

            <DoctorComponent />

        </div>
    );
};

export default Company;