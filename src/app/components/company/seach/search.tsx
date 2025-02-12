'use client';

import React, {useEffect, useState} from 'react';
import styles from './seach.module.css';
import Select, { SelectCompany } from "@/app/components/select/select";
import Button from "@/app/components/button/button";
import {FaFileExport, FaSearch} from "react-icons/fa";
import Input from "@/app/components/input/input";
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import { BusinessGroupService } from '@/app/service/BusinessGroupService';

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
];

interface Props {
    onSelectBusinessGroup: (businessGroup: BusinessGroup) => void;
}

const SearchCompany: React.FC<Props> = ({ onSelectBusinessGroup }) => {
    const [status, setStatus] = useState<boolean>(true);
    const [groupName, setGroupName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const [businessGroupList, setBusinessGroupList] = useState<BusinessGroup[]>([]);

    const handleGetAllBusinessGroup = async () => {
        const businessService = new BusinessGroupService();
        const data = await businessService.getAllBusinessGroups();
        setBusinessGroupList(data);
    }

    const handleSelectBusinessGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroupId = Number(event.target.value);
        const selectedGroup = businessGroupList.find(group => group.id === selectedGroupId);
        if (selectedGroup) {
            setGroupName(selectedGroup.name);
            onSelectBusinessGroup(selectedGroup);
        }
    };
    
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value === 'true');
    };

    useEffect(() => {
        handleGetAllBusinessGroup().then();
    }, []);

    return (
        <div className={styles.container}>
        
            <div className={styles.wrapper}>
                <SelectCompany
                    label={'Grupo/Cliente'}
                    options={businessGroupList}
                    value={groupName}
                    onChange={handleSelectBusinessGroup}
                    width={'300px'}
                />
                <Select
                    label={'Status'}
                    options={statusOptions}
                    value={status.toString()}
                    onChange={handleStatusChange}
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