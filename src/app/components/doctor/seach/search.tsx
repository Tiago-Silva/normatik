import React, {useState} from 'react';
import Select from "@/app/components/select/select";
import styles from './seach.module.css';
import Button from "@/app/components/button/button";
import { FaSearch } from "react-icons/fa";
import Input from "@/app/components/input/input";

const statusOptions = [
    { value: true, label: 'Ativo' },
    { value: false, label: 'Desativado' },
];

interface Props {
    status: boolean;
    onSelectStatus: (status: boolean) => void;
}

const SearchDoctor: React.FC<Props> = (
    {
        status = true,
        onSelectStatus,
    }) => {
    const [name, setName] = useState('');

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectStatus(event.target.value === 'true');
    };

    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                
                <Input label={'Nome do Profissional'} value={name} onChange={handleSetName} width={'500px'} />
                <Select<boolean>
                    label={'Status'}
                    options={statusOptions}
                    value={status}
                    onChange={handleStatusChange}
                    width={'300px'}
                />
            </div>

            <div className={styles.wrapper}>
                <Button
                    title={'Buscar'}
                    icon={FaSearch}
                    background={'#31b331'}
                    width={'300px'}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};

export default SearchDoctor;