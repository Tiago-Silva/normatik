'use client';

import React, {useState} from 'react';
import styles from './seach.module.css';
import Input from "@/app/components/input/input";
import Select from "@/app/components/select/select";
import Button from "@/app/components/button/button";
import {FaFileExport, FaSearch} from "react-icons/fa";

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
    // Add more status options here
];

const SearchCompany = () => {

    const [status, setStatus] = useState('ativo');

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    return (
        <div className={styles.container}>
        
            <div className={styles.wrapper}>
                
                <Select
                    label={'Tipo de inscrição no eSocial'}
                    options={statusOptions}
                    value={status}
                    onChange={handleStatusChange}
                    width={'300px'}
                />

                <Select
                    label={'CNPJ'}
                    options={statusOptions}
                    value={status}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
            </div>

            <div className={styles.wrapper}>
                <Button
                    title={'Buscar'}
                    icon={FaSearch}
                    background={'#31b331'}
                    width={'300px'} onClick={function (): void {
                        throw new Error('Function not implemented.');
                    } }                />

                <Button
                    title={'Exportar'}
                    icon={FaFileExport}
                    width={'300px'} onClick={function (): void {
                        throw new Error('Function not implemented.');
                    } }                />
            </div>
        </div>
    );
};

export default SearchCompany;