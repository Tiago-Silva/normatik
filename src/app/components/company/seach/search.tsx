import React, { useState, useEffect } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';
import { BusinessGroupService } from '@/app/service/BusinessGroupService';
import Select from "@/app/components/select/select";

const statusOptions = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Desativado' },
];

interface Props {
    businessGroup: BusinessGroup;
    onSelectBusinessGroup: (businessGroup: BusinessGroup) => void;
}

const SearchCompany: React.FC<Props> = ({ businessGroup, onSelectBusinessGroup }) => {
    const [status, setStatus] = useState<string>('true');
    const [businessGroupList, setBusinessGroupList] = useState<BusinessGroup[]>([]);

    const handleGetAllBusinessGroup = async () => {
        const businessService = new BusinessGroupService();
        const data = await businessService.getAllBusinessGroups();
        setBusinessGroupList(data);
        onSelectBusinessGroup(data[0]);
    }

    const handleSelectBusinessGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = JSON.parse(event.target.value) as BusinessGroup;
        onSelectBusinessGroup(selectedGroup);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        handleGetAllBusinessGroup().then();
    }, []);

    return (
        <div>
            <Select<BusinessGroup>
                label={'Grupo/Cliente'}
                options={businessGroupList.map(group => ({ value: group, label: group.name }))}
                value={businessGroup}
                onChange={handleSelectBusinessGroup}
                width={'300px'}
            />
            <Select<string>
                label={'Status'}
                options={statusOptions}
                value={status}
                onChange={handleStatusChange}
                width={'300px'}
            />
        </div>
    );
};

export default SearchCompany;