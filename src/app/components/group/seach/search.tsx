'use client';

import React, { useState } from 'react';
import styles from './seach.module.css';
import Input from "@/app/components/input/input";
import Select from "@/app/components/select/select";
import Button from "@/app/components/button/button";
import { FaFileExport, FaSearch } from "react-icons/fa";

const statusOptions = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Desativado' },
];

interface Props {
    onSearchBusinessGroup: (name: string, status: boolean) => void;
}

const Search: React.FC<Props> = ({ onSearchBusinessGroup }) => {
    const [status, setStatus] = useState<boolean>(true);
    const [name, setName] = useState('');

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value === 'true');
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Input label={'Nome'} width={'500px'} value={name} onChange={(e) => setName(e.target.value)}/>
                <Select
                    label={'Status'}
                    options={statusOptions}
                    value={status.toString()}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
            </div>

            <div className={styles.wrapper}>
                <Button
                    title={'Buscar'}
                    icon={FaSearch}
                    background={'#31b331'}
                    width={'300px'}
                    onClick={() => onSearchBusinessGroup(name, status)}
                />

                <Button
                    title={'Exportar'}
                    icon={FaFileExport}
                    width={'300px'} onClick={function (): void {
                    throw new Error('Function not implemented.');
                }} />
            </div>
        </div>
    );
};

export default Search;