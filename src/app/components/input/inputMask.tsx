import React from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';
import styles from './input.module.css';
import { useHookFormMask } from 'use-mask-input';

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    mask: string[];
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    disabled?: boolean;
    register: UseFormRegister<T>;
    error?: FieldError | undefined;
}

const InputMask = <T extends FieldValues>(
    {
        label,
        name,
        mask,
        width,
        disabled,
        register,
        error
    }: Props<T>) => {

    const registerWithMask = useHookFormMask(register);

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                style={{ width }}
                disabled={disabled}
                {...registerWithMask(name, mask)}
            />
            {error && <span className={styles.error}>{error.message}</span>}
        </div>
    );
};

export default InputMask;