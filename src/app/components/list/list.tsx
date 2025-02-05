import React from 'react';
import styles from './list.module.css';
import { FaEdit } from 'react-icons/fa';
import Button from '@/app/components/button/button';

interface Column {
    key: string;
    label: string;
}

interface ListItem {
    codigo: string;
    nome: string;
    status: string;
    [key: string]: string;
}
interface Props {
    columns: Column[];
    data: ListItem[];
    showEditButton?: boolean;
}

const List: React.FC<Props> = ({ columns, data, showEditButton = true }) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                ))}
                {showEditButton && <th></th>}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column) => (
                        <td key={column.key}>{item[column.key]}</td>
                    ))}
                    {showEditButton && (
                        <td>
                            <Button
                                title={'Editar'}
                                icon={FaEdit}
                                background={'#31b331'}
                                width={'100px'}
                            />
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default List;