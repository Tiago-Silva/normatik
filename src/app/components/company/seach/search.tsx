import React, { useState, useEffect } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import { BusinessGroupService } from '@/app/service/BusinessGroupService';
import Select from "@/app/components/select/select";
import styles from './seach.module.css';
import Button from "@/app/components/button/button";
import { FaFileExport, FaSearch } from "react-icons/fa";

const statusOptions = [
    { value: true, label: 'Ativo' },
    { value: false, label: 'Desativado' },
];

interface Props {
    businessGroup: BusinessGroup;
    status: boolean;
    onSelectBusinessGroup: (businessGroup: BusinessGroup) => void;
    onSelectStatus: (status: boolean) => void;
    onSearchBusinessGroup: (businessGroup: BusinessGroup, status: boolean) => void;
}

const SearchCompany: React.FC<Props> = (
    {
        status = true,
        businessGroup,
        onSelectBusinessGroup,
        onSelectStatus,
        onSearchBusinessGroup
    }) => {
    const [businessGroupList, setBusinessGroupList] = useState<BusinessGroup[]>([]);

    const handleGetAllBusinessGroup = async () => {
        const businessService = new BusinessGroupService();
        const data = await businessService.getAllBusinessGroups();
        setBusinessGroupList(data);
        onSelectBusinessGroup(data[0]);
    }

    const handleSelectBusinessGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = JSON.parse(event.target.value) as BusinessGroup;
        onSelectBusinessGroup(selectedGroup);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectStatus(event.target.value === 'true');
    };

    useEffect(() => {
        handleGetAllBusinessGroup().then();
    }, []);

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                <Select<BusinessGroup>
                    label={'Grupo/Cliente'}
                    options={businessGroupList.map(group => ({ value: group, label: group.name }))}
                    value={businessGroup}
                    onChange={handleSelectBusinessGroup}
                    width={'300px'}
                />
                <Select<boolean>
                    label={'Status'}
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
                    width={'300px'}
                    onClick={() => onSearchBusinessGroup(businessGroup, status)}
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

export default SearchCompany;