import React from 'react';
import styles from './input.module.css';
import {useMask} from "@react-input/mask";

interface Props {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mask: string;
    width?: string;
    disabled?: boolean;
}

const Input: React.FC<Props> = ({ label, value, onChange, width, disabled, mask }) => {

    const inputRef = useMask({
        mask: mask,
        replacement: { _: /\d/ },
    });

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                ref={inputRef}
                className={styles.input}
                style={{ width }}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;