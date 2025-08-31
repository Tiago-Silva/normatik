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

    const {filters, setStatus, setName, setCode, setCompany, setFunc} = useSearchFilters();

    const handleGetFunctionByCompanyIdAndStatus = async (
        companyId: number,
        status: boolean,
        functionName: string,
        internalCode: number
    ) => {
        setStatus(status);
        const service = new FunctionService();
        const data = await service.getFunctionByCompanyIdStatusNameAndCode(
            companyId,
            status,
            functionName,
            internalCode
        );
        setFilteredFunctionList(data);
    }

    const handleShowForm = () => {
        if (!showForm && filters.func) {
            setFunc({} as Function);
        }
        setShowForm(!showForm);
    };

    const handleUpdateFunctionListWhenSaving = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            await handleGetFunctionByCompanyIdAndStatus(
                filters.company.id,
                filters.status,
                filters.name,
                filters.code
            );
            handleShowForm();
        } catch (error) {
            console.error('Erro ao atualizar lista:', error);
        }
    }

    const handleEditFunction = (data: Function) => {
        setFunc(data);
        setShowForm(!showForm);
    }

    return (
        <div className={styles.container}>
            <HeaderFunction isShow={showForm} onClickButton={handleShowForm}/>
            {showForm ? (
                <FormFunction
                    company={filters.company}
                    func={filters.func}
                    onShowForm={handleShowForm}
                    onUpdateSectorListWhenSaving={handleUpdateFunctionListWhenSaving}
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
                        onEditItem={handleEditFunction}
                    />
                </>
            )}
        </div>
    );
};

export default FunctionComponent;