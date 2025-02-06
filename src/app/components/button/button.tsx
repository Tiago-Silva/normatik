import React from 'react';
import { IconType } from 'react-icons';
import styles from './button.module.css';

interface Props {
    title: string;
    icon: IconType;
    background?: string;
    width?: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button: React.FC<Props> = (
    {
        title,
        icon: Icon,
        background = '#007bff',
        width = '150px',
        onClick,
        disabled = false,
        ...rest
    }) => {
    return (
        <button
            className={styles.container}
            style={{ background, width }}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            <Icon className={styles.icon} />
            {title}
        </button>
    );
};

export default Button;