'use client';

import React, { useState } from 'react';
import styles from './toggleSwitch.module.css';

interface ToggleSwitchProps {
    label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.switch} ${isChecked ? styles.checked : ''}`} onClick={handleToggle}>
                <div className={`${styles.slider} ${isChecked ? styles.checked : ''}`}></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;