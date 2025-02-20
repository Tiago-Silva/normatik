
import React from 'react';
import styles from './toggleSwitch.module.css';

interface ToggleSwitchProps {
    label: string;
    isChecked: boolean;
    onClick: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isChecked, onClick }) => {

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.switch} ${isChecked ? styles.checked : ''}`} onClick={onClick}>
                <div className={`${styles.slider} ${isChecked ? styles.checked : ''}`}></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;