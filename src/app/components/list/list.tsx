import React from 'react';
import styles from './list.module.css';
import { FaEdit } from 'react-icons/fa';
import Button from '@/app/components/button/button';

interface Column<T> {
    header: string;
    accessor: (item: T) => React.ReactNode;
}

interface Props<T> {
    showEditButton?: boolean;
    list: T[];
    columns: Column<T>[];
    onEditItem?: (item: T) => void;
}

const List = <T,>(
    {
        showEditButton = true,
        list,
        columns,
        onEditItem
    }: Props<T>) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{column.accessor(item)}</td>
                        ))}
                        {showEditButton && onEditItem && (
                            <td>
                                <Button
                                    title={'Editar'}
                                    icon={FaEdit}
                                    background={'#31b331'}
                                    width={'100px'}
                                    onClick={() => onEditItem(item)}
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