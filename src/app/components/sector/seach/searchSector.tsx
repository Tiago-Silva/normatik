import React, { useState } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import Select from "@/app/components/select/select";
import styles from './searchSector.module.css';
import Button from "@/app/components/button/button";
import { FaFileExport, FaSearch } from "react-icons/fa";
import {Company} from "@/app/interface/Company";

const statusOptions = [
    { value: true, label: 'Ativo' },
    { value: false, label: 'Desativado' },
];

interface Props {
    businessGroup: BusinessGroup;
    company: Company;
    status: boolean;
    onSelectBusinessGroup: (businessGroup: BusinessGroup) => void;
    onSelectStatus: (status: boolean) => void;
    onSearchBusinessGroup: (businessGroup: BusinessGroup, status: boolean, companyName: string) => void;
}

const SearchSector: React.FC<Props> = (
    {
        businessGroup,
        company,
        status,
        onSelectBusinessGroup,
        onSelectStatus,
        onSearchBusinessGroup,
    }
) => {
    const [businessGroupList, setBusinessGroupList] = useState<BusinessGroup[]>([]);
    const [companyList, setCompanyList] = useState<Company[]>([]);

    const handleSelectBusinessGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = JSON.parse(event.target.value) as BusinessGroup;
        onSelectBusinessGroup(selectedGroup);
    };

    const handleSelectCompany = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // const selectedGroup = JSON.parse(event.target.value) as BusinessGroup;
        // onSelectBusinessGroup(selectedGroup);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectStatus(event.target.value === 'true');
    };

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
                <Select<Company>
                    label={'Empresa'}
                    options={companyList.map(group => ({ value: group, label: group.name }))}
                    value={company}
                    onChange={handleSelectCompany}
                    width={'300px'}
                />
            </div>

            <div className={styles.wrapper}>
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
                    onClick={() => onSearchBusinessGroup(businessGroup, status, company.name)}
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

export default SearchSector;