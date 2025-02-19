import React from 'react';
import styles from './select.module.css';
import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface Props<T extends FieldValues> {
    label: string;
    options: Option[];
    width?: string;
    register?: ReturnType<UseFormRegister<T>>;
    error?: FieldError | undefined;
}

const SelectZod = <T extends FieldValues>({ label, options, width, register, error }: Props<T>) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} style={{ width }} {...register}>
                {options.map((option) => (
                    <option key={JSON.stringify(option.value)} value={JSON.stringify(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.error}>{error.message}</span>}
        </div>
    );
};

export default SelectZod;