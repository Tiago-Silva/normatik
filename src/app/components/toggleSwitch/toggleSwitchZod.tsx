import React, { useState } from 'react';
import styles from './toggleSwitch.module.css';
import {FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue} from 'react-hook-form';

interface ToggleSwitchProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    isChecked: boolean;
    setValue: UseFormSetValue<T>;
    register?: ReturnType<UseFormRegister<T>>;
}

const ToggleSwitchZod = <T extends FieldValues>(
    {
        label,
        name,
        isChecked,
        setValue,
        register
    }: ToggleSwitchProps<T>) => {
    const [checked, setChecked] = useState(isChecked);

    const handleClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        setValue(name, newChecked as PathValue<T, Path<T>>);
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.switch} ${checked ? styles.checked : ''}`} onClick={handleClick}>
                <div className={`${styles.slider} ${checked ? styles.checked : ''}`}></div>
            </div>
            <input type="checkbox" checked={checked} {...register} style={{ display: 'none' }} />
        </div>
    );
};

export default ToggleSwitchZod;