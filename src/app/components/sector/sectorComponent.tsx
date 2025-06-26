'use client';

import React, {useState} from 'react';
import styles from './sector-component.module.css';
import HeaderSector from "./header";
import SearchSector from "@/app/components/sector/seach/searchSector";
import {Company} from "@/app/interface/Company";
import List from "@/app/components/list/list";
import {Sector} from "@/app/interface/Sector";
import FormSector from "@/app/components/sector/form";
import {SectorService} from "@/app/service/SectorService";

const columns = [
    { header: 'Cód: Setor', accessor: (item: Sector) => item.id },
    { header: 'Nome', accessor: (item: Sector) => item.name },
    { header: 'Nome/Ref', accessor: (item: Sector) => item.nameRef },
    { header: 'Status', accessor: (item: Sector) => (item.status ? "Ativo" : "Inativo") },
];

const SectorComponent = () => {
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
            <HeaderSector isShow={showForm} onClickButton={handleShowForm} />
            {showForm ? (
                <FormSector
                    company={company}
                    sector={sector}
                    onShowForm={handleShowForm}
                    onUpdateSectorListWhenSaving={handleUpdateSectorListWhenSaving}
                />
            ) : (
              <>
                  <SearchSector
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

export default SectorComponent;