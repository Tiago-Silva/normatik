'use client';

import React, {useState} from 'react';
import styles from './seach.module.css';
import Input from "@/app/components/input/input";
import Select from "@/app/components/select/select";

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
    // Add more status options here
];

const Search = () => {

    const [status, setStatus] = useState('ativo');

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Input label={'Nome'} width={'500px'}/>
                <Select
                    label={'Status'}
                    options={statusOptions}
                    value={status}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
            </div>
        </div>
    );
};

export default Search;