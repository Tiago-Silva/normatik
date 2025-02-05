import React from 'react';
import styles from './input.module.css';

interface Props {
    label: string;
    width?: string;
}

const Input: React.FC<Props> = ({ label, width, ...res }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} style={{ width }} {...res} />
        </div>
    );
};

export default Input;