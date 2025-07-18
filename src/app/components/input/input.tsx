import React from 'react';
import styles from './input.module.css';

interface Props {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    disabled?: boolean;
    type?: string;
}

const Input: React.FC<Props> = (
    {
        label,
        value,
        onChange,
        width,
        disabled,
        type = 'text',
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
                type={type}
            />
        </div>
    );
};

export default Input;