import React, {useEffect, useState} from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import Select from "@/app/components/select/select";
import styles from './searchSector.module.css';
import Button from "@/app/components/button/button";
import { FaFileExport, FaSearch } from "react-icons/fa";
import {Company} from "@/app/interface/Company";
import {BusinessGroupService} from "@/app/service/BusinessGroupService";
import {CompanyService} from "@/app/service/CompanyService";

const statusOptions = [
    { value: true, label: 'Ativo' },
    { value: false, label: 'Desativado' },
];

interface Props {
    company: Company;
    onSetCompany: (company: Company) => void;
    status: boolean;
    onSelectStatus: (status: boolean) => void;
    onSearchBusinessGroup: (businessGroup: BusinessGroup, status: boolean, companyName: string) => void;
}

const SearchSector: React.FC<Props> = (
    {
        company,
        onSetCompany,
        status,
        onSelectStatus,
        onSearchBusinessGroup,
    }
) => {
    const [businessGroupList, setBusinessGroupList] = useState<BusinessGroup[]>([]);
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [businessGroup, setBusinessGroup] = useState<BusinessGroup>({} as BusinessGroup);

    const handleSelectBusinessGroup = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = JSON.parse(event.target.value) as BusinessGroup;
        setBusinessGroup(selectedGroup);
        await handleGetCompaniesByBusinessGroupAndStatus(selectedGroup, status, '');
    };

    const handleGetAllBusinessGroup = async () => {
        const businessService = new BusinessGroupService();
        const data = await businessService.getAllBusinessGroups();
        setBusinessGroupList(data);
        await handleGetCompaniesByBusinessGroupAndStatus(data[0], true, '');
    }

    const handleGetCompaniesByBusinessGroupAndStatus = async (group: BusinessGroup, status: boolean, companyName: string) => {
        const service = new CompanyService();
        const data = await service.getCompaniesByBusinessGroupAndStatus(group.id, status, companyName);
        onSetCompany(data[0]);
        setCompanyList(data);
    }


    const handleSelectCompany = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSetCompany(JSON.parse(event.target.value) as Company);
        // onSelectBusinessGroup(selectedGroup);
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