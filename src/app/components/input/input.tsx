import React from 'react';
import styles from './input.module.css';

interface Props {
    label: string;
    msgError?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    disabled?: boolean;
}

const Input: React.FC<Props> = (
    {
        label,
        value,
        onChange,
        width,
        msgError,
        disabled
    }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                style={{ width }}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
               {value?.length < 2 && (
                    <p style={{color: 'red'}}>{msgError}</p>
                )}
        </div>
    );
};

export default Input;