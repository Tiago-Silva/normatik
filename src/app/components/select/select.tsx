import React from 'react';
import styles from './select.module.css';
import { BusinessGroup } from '@/app/interface/BusinessGroup';

interface Props {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
}

interface PropsCompany {
    label: string;
    options: BusinessGroup[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
}

const Select: React.FC<Props> = ({ label, options, value, onChange, width }) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} value={value} onChange={onChange} style={{ width }}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
export const SelectCompany: React.FC<PropsCompany> = ({ label, options, value, onChange, width }) => {
    return (
        <div className={styles.selectContainer}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} value={value} onChange={onChange} style={{ width }}>
                {options.map((option) => (
                    <option key={option.name} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Select;