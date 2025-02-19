'use client';

import React, { useState } from 'react';
import styles from './company-component.module.css';
import HeaderCompany from './header';
import SearchCompany from './seach/search';
import FormCompany from "@/app/components/company/form";
import List from "@/app/components/list/list";
import { Company } from "@/app/interface/Company";
import { CompanyService } from "@/app/service/CompanyService";
import { BusinessGroup } from "@/app/interface/BusinessGroup";

const columns = [
    { header: 'Cód: Empresa', accessor: (item: Company) => item.id },
    { header: 'Nome', accessor: (item: Company) => item.name },
    { header: 'Cnpj', accessor: (item: Company) => item.cnpj },
    { header: 'Status', accessor: (item: Company) => (item.status ? "Ativo" : "Inativo") },
];

const CompanyComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [businessGroup, setBusinessGroup] = useState<BusinessGroup>({} as BusinessGroup);
    const [status, setStatus] = useState<boolean>(true);
    const [filteredCompanyList, setFilteredCompanyList] = useState<Company[]>([]);
    const [company, setCompany] = useState<Company>({} as Company);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleEditCompany = (data: Company) => {
        setCompany(data);
        setShowForm(!showForm);
    }

    const handleGetCompaniesByBusinessGroupAndStatus = async (group: BusinessGroup, status: boolean) => {
        setBusinessGroup(group);
        setStatus(status);
        const service = new CompanyService();
        const data = await service.getCompaniesByBusinessGroupAndStatus(group.id, status);
        setFilteredCompanyList(data);
    }

    const handleUpdateCompanyListWhenSaving = () => {
        handleGetCompaniesByBusinessGroupAndStatus(businessGroup, true).then();
        handleShowForm();
    }

    return (
        <div className={styles.container}>
            <HeaderCompany isShow={showForm} onClickButton={handleShowForm} />
            {showForm ? (
                <FormCompany
                    onShowForm={handleShowForm}
                    company={company}
                    group={businessGroup}
                    onUpdateCompanyListWhenSaving={handleUpdateCompanyListWhenSaving}
                />
            ) : (
                <>
                    <SearchCompany
                        businessGroup={businessGroup}
                        status={status}
                        onSelectBusinessGroup={setBusinessGroup}
                        onSelectStatus={setStatus}
                        onSearchBusinessGroup={handleGetCompaniesByBusinessGroupAndStatus}
                    />
                    <List<Company>
                        list={filteredCompanyList}
                        columns={columns}
                        onEditItem={handleEditCompany}
                    />
                </>
            )}
        </div>
    );
};

export default CompanyComponent;