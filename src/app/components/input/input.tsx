import React from 'react';
import styles from './input.module.css';

interface Props {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
}

const Input: React.FC<Props> = ({ label, value, onChange,  width }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                style={{ width }}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;