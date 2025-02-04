import React from 'react';
import styles from './input.module.css';

interface Props {
    label: string;
}

const Input: React.FC<Props> = ({ label, ...res }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} {...res}/>
        </div>
    );
};

export default Input;