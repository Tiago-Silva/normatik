import React from 'react';
import styles from './select.module.css';

interface Props {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = ({ label, options, value, onChange }) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;