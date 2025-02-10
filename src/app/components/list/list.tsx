import React from 'react';
import styles from './list.module.css';
import { FaEdit } from 'react-icons/fa';
import Button from '@/app/components/button/button';
import { BusinessGroup } from "@/app/interface/BusinessGroup";

interface Props {
    showEditButton?: boolean;
    list: BusinessGroup[];
    onEditBusinessGroup: (businessGroup: BusinessGroup) => void;
}

const List: React.FC<Props> = ({ showEditButton = true, list, onEditBusinessGroup }) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Cód: Grupo</th>
                <th>Nome</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {list.map((item: BusinessGroup) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status ? "Ativo" : "Inativo"}</td>
                    {showEditButton && (
                        <td>
                            <Button
                                title={'Editar'}
                                icon={FaEdit}
                                background={'#31b331'}
                                width={'100px'}
                                onClick={() => onEditBusinessGroup(item)}
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