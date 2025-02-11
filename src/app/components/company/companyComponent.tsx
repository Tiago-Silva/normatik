'use client';

import React, {useState} from 'react';
import styles from './company-component.module.css';
import HeaderCompany from './header';
import SearchCompany from './seach/search';
import FormCompany from "@/app/components/company/form";
import List from "@/app/components/list/list";
import {Company} from "@/app/interface/Company";

const columns = [
    { header: 'Cód: Empresa', accessor: (item: Company) => item.id },
    { header: 'Nome', accessor: (item: Company) => item.name },
    { header: 'Cnpj', accessor: (item: Company) => item.cnpj },
    { header: 'Status', accessor: (item: Company) => (item.status ? "Ativo" : "Inativo") },
];

const staticCompanyList: Company[] = [
    { id: 1, name: 'Empresa A', cnpj: '00.000.000/0001-00', address: 'Endereço A', doctor: 'Dr. A', status: true },
    { id: 2, name: 'Empresa B', cnpj: '00.000.000/0002-00', address: 'Endereço B', doctor: 'Dr. B', status: false },
    { id: 3, name: 'Empresa C', cnpj: '00.000.000/0003-00', address: 'Endereço C', doctor: 'Dr. C', status: true },
];

const CompanyComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [companyList, setCompanyList] = useState<Company[]>(staticCompanyList);

    const handleClickButton = () => {
        setShowForm(!showForm);
    };

    const handleEditCompany = () => {
        console.log('Aquiiii: ');
    }

    return (
        <div className={styles.container}>

            <HeaderCompany />

            {showForm ? (
                <FormCompany onClickButton={handleClickButton} />
            ) : (
                <>
                    <SearchCompany />
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