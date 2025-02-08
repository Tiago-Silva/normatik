'use client';

import React, {useEffect, useState} from 'react';
import styles from './seach.module.css';
import Input from "@/app/components/input/input";
import Select, { SelectCompany } from "@/app/components/select/select";
import Button from "@/app/components/button/button";
import {FaFileExport, FaSearch} from "react-icons/fa";

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
    // Add more status options here
];
const TypesIns = [
    { value: 'ativo', label: 'Pessoa Juridica' },
    { value: 'desativado', label: 'Pessoa Fisica' },
    // Add more status options here
];

const SearchCompany = () => {
    
    const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetch("/api/business-groups") // Chamando a API interna do Next.js
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
            console.log(data);
          })
          .catch((error) => console.error("Erro ao buscar dados:", error));
      }, []);

    const [status, setStatus] = useState('ativo');

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };
    
    
    return (
        <div className={styles.container}>
        
            <div className={styles.wrapper}>
                
                <SelectCompany
                    label={'Grupo/Empresa'}
                    options={data}
                    value={status}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
                <Input label={'CNPJ'} value={''} onChange={() => {}}/>

                <Select
                    label={'Tipo de inscrição'}
                    options={TypesIns}
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