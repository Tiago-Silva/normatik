import React from 'react';
import { UseFormRegister, FieldError, FieldValues } from 'react-hook-form';
import styles from './input.module.css';

interface Props<T extends FieldValues> {
    label: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    disabled?: boolean;
    register?: ReturnType<UseFormRegister<T>>;
    error?: FieldError | undefined;
}

const InputZod = <T extends FieldValues>(
    {
        label,
        type = 'text',
        value,
        onChange,
        width,
        disabled,
        register,
        error
    }: Props<T>) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                style={{ width }}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...register}
            />
            {error && <span className={styles.error}>{error.message}</span>}
        </div>
    );
};

export default InputZod;