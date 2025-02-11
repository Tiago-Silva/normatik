'use client';

import React, {useEffect, useState} from 'react';
import styles from './seach.module.css';
import Select, { SelectCompany } from "@/app/components/select/select";
import Button from "@/app/components/button/button";
import {FaFileExport, FaSearch} from "react-icons/fa";
import Input from "@/app/components/input/input";

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
];

const SearchCompany = () => {
    const [status, setStatus] = useState<boolean>(true);
    const [groupName, setGroupName] = useState('');
    const [companyName, setCompanyName] = useState('');

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

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value === 'true');
    };
    
    
    return (
        <div className={styles.container}>
        
            <div className={styles.wrapper}>
                <SelectCompany
                    label={'Grupo/Cliente'}
                    options={data}
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    width={'300px'}
                />
                <Select
                    label={'Status'}
                    options={statusOptions}
                    value={status.toString()}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
            </div>

            <div className={styles.wrapper}>
                <Input label={'Nome'} width={'500px'} value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
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