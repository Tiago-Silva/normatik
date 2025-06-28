'use client';

import React, {useState} from 'react';
import styles from './function-component.module.css';
import {Company} from "@/app/interface/Company";
import List from "@/app/components/list/list";
import {Sector} from "@/app/interface/Sector";
import {SectorService} from "@/app/service/SectorService";
import HeaderFunction from "./header";
import SearchFunction from "@/app/components/fuction/seach/searchFunction";
import FormFunction from "@/app/components/fuction/form";

const columns = [
    { header: 'Cód: Setor', accessor: (item: Sector) => item.id },
    { header: 'Nome', accessor: (item: Sector) => item.name },
    { header: 'Nome/Ref', accessor: (item: Sector) => item.nameRef },
    { header: 'Status', accessor: (item: Sector) => (item.status ? "Ativo" : "Inativo") },
];

const FunctionComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [company, setCompany] = useState<Company>({} as Company);
    const [status, setStatus] = useState<boolean>(true);
    const [filteredSectorList, setFilteredSectorList] = useState<Sector[]>([]);
    const [sector, setSector] = useState<Sector>({} as Sector);

    const handleShowForm = () => {
        if (!showForm && sector) {
            setSector({} as Sector);
        }
        setShowForm(!showForm);
    };

    const handleGetSectorByCompanyIdAndSectorStatus = async (companyId: number, status: boolean) => {
        setStatus(status);
        const service = new SectorService();
        const data = await service.getSectorsByCompanyIdAndStatus(companyId, status);
        setFilteredSectorList(data);
    }

    const handleUpdateSectorListWhenSaving = () => {
        handleGetSectorByCompanyIdAndSectorStatus(company.id, true).then();
        handleShowForm();
    }

    const handleEditSector = (data: Sector) => {
        setSector(data);
        setShowForm(!showForm);
    }

    return (
        <div className={styles.container}>
            <HeaderFunction isShow={showForm} onClickButton={handleShowForm} />
            {showForm ? (
                <FormFunction
                    company={company}
                    sector={sector}
                    onShowForm={handleShowForm}
                    onUpdateSectorListWhenSaving={handleUpdateSectorListWhenSaving}
                />
            ) : (
              <>
                  <SearchFunction
                      company={company}
                      onSetCompany={setCompany}
                      status={status}
                      onSelectStatus={setStatus}
                      onSearchSectors={handleGetSectorByCompanyIdAndSectorStatus}
                  />
                  <List<Sector>
                      list={filteredSectorList}
                      columns={columns}
                      onEditItem={handleEditSector}
                  />
              </>
            )}
        </div>
    );
};

export default FunctionComponent;