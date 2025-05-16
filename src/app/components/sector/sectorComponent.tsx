'use client';

import React, {useState} from 'react';
import styles from './sector-component.module.css';
import HeaderSector from "./header";
import SearchSector from "@/app/components/sector/seach/searchSector";
import {BusinessGroup} from "@/app/interface/BusinessGroup";
import {Company} from "@/app/interface/Company";
import List from "@/app/components/list/list";
import {Sector} from "@/app/interface/Sector";
import FormSector from "@/app/components/sector/form";

const columns = [
    { header: 'Cód: Setor', accessor: (item: Sector) => item.id },
    { header: 'Nome', accessor: (item: Sector) => item.name },
    { header: 'Nome/Ref', accessor: (item: Sector) => item.nameRef },
    { header: 'Status', accessor: (item: Sector) => (item.status ? "Ativo" : "Inativo") },
];

const SectorComponent = () => {
    const [showForm, setShowForm] = useState(false);
    // const [businessGroup, setBusinessGroup] = useState<BusinessGroup>({} as BusinessGroup);
    const [company, setCompany] = useState<Company>({} as Company);
    const [status, setStatus] = useState<boolean>(true);
    const [filteredSectorList, setFilteredSectorList] = useState<Sector[]>([]);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleGetCompaniesByBusinessGroupAndStatus = async (group: BusinessGroup, status: boolean, companyName: string) => {
        // setBusinessGroup(group);
        // setStatus(status);
        // const service = new CompanyService();
        // const data = await service.getCompaniesByBusinessGroupAndStatus(group.id, status, companyName);
        // setFilteredCompanyList(data);
    }

    const handleUpdateSectorListWhenSaving = () => {
        // handleGetCompaniesByBusinessGroupAndStatus(businessGroup, true, '').then();
        handleShowForm();
    }

    return (
        <div className={styles.container}>
            <HeaderSector isShow={showForm} onClickButton={handleShowForm} />
            {showForm ? (
                <FormSector
                    company={company}
                    onShowForm={handleShowForm}
                    onUpdateCompanyListWhenSaving={handleUpdateSectorListWhenSaving}
                />
            ) : (
              <>
                  <SearchSector
                      company={company}
                      onSetCompany={setCompany}
                      status={status}
                      onSelectStatus={setStatus}
                      onSearchBusinessGroup={handleGetCompaniesByBusinessGroupAndStatus}
                  />
                  <List<Sector>
                      list={filteredSectorList}
                      columns={columns}
                  />
              </>
            )}
        </div>
    );
};

export default SectorComponent;