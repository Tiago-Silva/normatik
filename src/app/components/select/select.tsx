import React from 'react';
import styles from './select.module.css';

interface Option<T> {
    value: T;
    label: string;
}

interface Props<T> {
    label: string;
    options: Option<T>[];
    value: T;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
}

const Select = <T,>({ label, options, value, onChange, width }: Props<T>) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} value={JSON.stringify(value)} onChange={onChange} style={{ width }}>
                {options.map((option) => (
                    <option key={JSON.stringify(option.value)} value={JSON.stringify(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;