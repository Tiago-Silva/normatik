'use client';

import React, { useEffect, useState } from 'react';
import styles from './group.module.css';
import HeaderGroup from "@/app/components/group/header";
import Search from "@/app/components/group/seach/search";
import List from "@/app/components/list/list";
import FormGroup from "@/app/components/group/form";
import { BusinessGroupService } from "@/app/service/BusinessGroupService";
import { BusinessGroup } from "@/app/interface/BusinessGroup";

const GroupComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [businessList, setBusinessList] = useState<BusinessGroup[]>([]);
    const [selectedBusinessGroup, setSelectedBusinessGroup] = useState<BusinessGroup | undefined>(undefined);
    const [searchParams, setSearchParams] = useState<{ name: string, status: boolean }>({ name: '', status: true });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleGetAllBusinessGroup = async () => {
        const service = new BusinessGroupService();
        const data = await service.getAllBusinessGroups();
        setBusinessList(data);
    };

    const handleClickButton = () => {
        setShowForm(!showForm);
        setSelectedBusinessGroup(undefined);
    };

    const handleShowForm = () => {
        setShowForm((prev) => !prev);
        handleGetAllBusinessGroup().then();
    };

    const handleEditBusinessGroup = (item: BusinessGroup) => {
        setSelectedBusinessGroup(item);
        setShowForm(true);
    };

    const handleSearchBusinessGroup = (name: string, status: boolean) => {
        setSearchParams({ name, status });
    };

    useEffect(() => {
        handleGetAllBusinessGroup().then();
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

    const filteredBusinessList = businessList.filter(group =>
        group.name.includes(searchParams.name) && group.status === searchParams.status
    );

    return (
        <div className={styles.container}>
            <HeaderGroup isShow={showForm} onClickButton={handleClickButton} />

            {showForm ? (
                <FormGroup
                    onShowForm={handleShowForm}
                    onClickButton={handleClickButton}
                    businessGroup={selectedBusinessGroup}
                />
            ) : (
                <>
                    <Search onSearchBusinessGroup={handleSearchBusinessGroup} />
                    <List
                        list={filteredBusinessList}
                        onEditBusinessGroup={handleEditBusinessGroup}
                    />
                </>
            )}
        </div>
    );
};

export default GroupComponent;