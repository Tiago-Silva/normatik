'use client';

import React, { useState } from 'react';
import styles from './doctor-component.module.css';
import SearchDoctor from "./seach/search";
import HeaderDoctor from "./header";
import {Doctor} from "@/app/interface/Doctor";
import {DoctorService} from "@/app/service/DoctorService";
import List from "@/app/components/list/list";
import FormDoctor from "@/app/components/doctor/form";

const columns = [
    { header: 'Profissional', accessor: (item: Doctor) => item.name },
    { header: 'Status', accessor: (item: Doctor) => (item.status ? "Ativo" : "Inativo") },
    { header: 'Editado em', accessor: (item: Doctor) => item.createdAt.toString() },
    { header: 'Editado por', accessor: (item: Doctor) => item.updatedAt.toString() },
    { header: 'Responsabilidade', accessor: (item: Doctor) => item.CRM },
];

const DoctorComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState<boolean>(true);
    const [filteredDoctorList, setFilteredDoctorList] = useState<Doctor[]>([]);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleGetDoctorsByNameAndStatus = async (name: string, status: boolean) => {
        setStatus(status);
        const service = new DoctorService();
        const data = await service.searchDoctorsByNameAndStatus(name, status);
        setFilteredDoctorList(data);
    }

    return (
        <div className={styles.container}>
            <HeaderDoctor isShow={showForm} onClickButton={handleShowForm} />
            {showForm ? (
                <FormDoctor onShowForm={handleShowForm}/>
            ): (
                <>
                    <SearchDoctor
                        status={status}
                        onSelectStatus={setStatus}
                        onSearchDoctors={handleGetDoctorsByNameAndStatus}
                    />

                    <List<Doctor>
                        list={filteredDoctorList}
                        columns={columns}
                        onEditItem={() => {}}
                    />
                </>
            )}
        </div>
    );
};

export default DoctorComponent;