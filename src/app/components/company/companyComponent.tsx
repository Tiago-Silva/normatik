'use client';

import React, {useEffect, useState} from 'react';
import styles from './company-component.module.css';
import HeaderCompany from './header';
import SearchCompany from './seach/search';
import FormCompany from "@/app/components/company/form";
import List from "@/app/components/list/list";
import {Company} from "@/app/interface/Company";
import {CompanyService} from "@/app/service/CompanyService";
import {BusinessGroup} from "@/app/interface/BusinessGroup";

const columns = [
    { header: 'Cód: Empresa', accessor: (item: Company) => item.id },
    { header: 'Nome', accessor: (item: Company) => item.name },
    { header: 'Cnpj', accessor: (item: Company) => item.cnpj },
    { header: 'Status', accessor: (item: Company) => (item.status ? "Ativo" : "Inativo") },
];

const CompanyComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [businessGroup, setBusinessGroup] = useState<BusinessGroup>({} as BusinessGroup);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleEditCompany = () => {
        console.log('Aquiiii: ');
    }

    const handleGetAllCompany = async () => {
        const service = new CompanyService();
        const data = await service.getAllCompanies();
        setCompanyList(data);
    }

    useEffect(() => {
        handleGetAllCompany().then();
    }, []);

    return (
        <div className={styles.container}>

            <HeaderCompany isShow={showForm} onClickButton={handleShowForm}/>

            {showForm ? (
                <FormCompany onShowForm={handleShowForm} group={businessGroup} />
            ) : (
                <>
                    <SearchCompany businessGroup={businessGroup} onSelectBusinessGroup={setBusinessGroup}/>
                    <List<Company>
                        list={companyList}
                        columns={columns}
                        onEditItem={handleEditCompany}
                    />
                </>
            )}

        </div>
    );
};

export default CompanyComponent;