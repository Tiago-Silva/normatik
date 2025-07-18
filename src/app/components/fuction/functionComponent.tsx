'use client';

import React, {useState} from 'react';
import styles from './function-component.module.css';
import List from "@/app/components/list/list";
import {Function} from "@/app/interface/Function";
import HeaderFunction from "./header";
import SearchFunction from "@/app/components/fuction/seach/searchFunction";
import FormFunction from "@/app/components/fuction/form";
import {useSearchFilters} from "@/app/hooks/useSearchFilters";
import {FunctionService} from "@/app/service/FunctionService";

const columns = [
    {header: 'Cód: Função', accessor: (item: Function) => item.id},
    {header: 'Nome', accessor: (item: Function) => item.name},
    {header: 'Cod: Interno', accessor: (item: Function) => item.code},
    {header: 'Status', accessor: (item: Function) => (item.status ? "Ativo" : "Inativo")},
];

const FunctionComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [filteredFunctionList, setFilteredFunctionList] = useState<Function[]>([]);

    const {filters, setStatus, setName, setCode, setCompany} = useSearchFilters();

    const handleGetFunctionByCompanyIdAndStatus = async (companyId: number, status: boolean) => {
        setStatus(status);
        const service = new FunctionService();
        const data = await service.getFunctionByCompanyIdAndStatus(companyId, status);
        setFilteredFunctionList(data);
    }

    const handleShowForm = () => {
        // if (!showForm && filters.sector) {
        //     setSector({} as Sector);
        // }
        setShowForm(!showForm);
    };

    // const handleGetSectorByCompanyIdAndSectorStatus = async (companyId: number, status: boolean) => {
    //     setStatus(status);
    //     const service = new SectorService();
    //     const data = await service.getSectorsByCompanyIdAndStatus(companyId, status);
    //     setFilteredSectorList(data);
    // }

    // const handleUpdateSectorListWhenSaving = () => {
    //     handleGetSectorByCompanyIdAndSectorStatus(company.id, true).then();
    //     handleShowForm();
    // }

    // const handleEditSector = (data: Sector) => {
    //     setSector(data);
    //     setShowForm(!showForm);
    // }

    return (
        <div className={styles.container}>
            <HeaderFunction isShow={showForm} onClickButton={handleShowForm}/>
            {showForm ? (
                <FormFunction
                    company={filters.company}
                    onShowForm={handleShowForm}
                    onUpdateSectorListWhenSaving={() => {
                    }}
                />
            ) : (
                <>
                    <SearchFunction
                        searchFilters={filters}
                        searchActions={{
                            onSetCompany: setCompany,
                            onSelectStatus: setStatus,
                            onSearchFunctions: handleGetFunctionByCompanyIdAndStatus,
                            onSetName: setName,
                            onSetCode: setCode
                        }}
                    />
                    <List<Function>
                        list={filteredFunctionList}
                        columns={columns}
                        onEditItem={() => {}}
                    />
                </>
            )}
        </div>
    );
};

export default FunctionComponent;