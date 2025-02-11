import { useState, useEffect } from 'react';
import { BusinessGroup } from '@/app/interface/BusinessGroup';

export const useBusinessGroupForm = (initialBusinessGroup?: BusinessGroup) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialBusinessGroup) {
            setName(initialBusinessGroup.name);
            setStatus(initialBusinessGroup.status);
        }
    }, [initialBusinessGroup]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleStatusChange = () => setStatus(!status);

    return {
        name,
        status,
        isSaving,
        setIsSaving,
        handleNameChange,
        handleStatusChange,
    };
};