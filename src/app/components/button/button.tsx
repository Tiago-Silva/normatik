import React from 'react';
import { IconType } from 'react-icons';
import styles from './button.module.css';

interface Props {
    title: string;
    icon: IconType;
    background?: string;
    width?: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = (
    {
        title,
        icon: Icon,
        background = '#007bff',
        width = '150px',
        onClick,
        disabled = false,
        color = '#FFFFFF',
        type = 'button',
        ...rest
    }) => {
    return (
        <button
            className={styles.container}
            style={{ background, width, color }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...rest}
        >
            <Icon className={styles.icon} />
            {title}
        </button>
    );
};

export default Button;