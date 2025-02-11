import React from 'react';
import styles from './list.module.css';
import { FaEdit } from 'react-icons/fa';
import Button from '@/app/components/button/button';
import { BusinessGroup } from "@/app/interface/BusinessGroup";

<<<<<<< HEAD

=======
>>>>>>> main
interface Props {
    showEditButton?: boolean;
    list: BusinessGroup[];
    onEditBusinessGroup: (businessGroup: BusinessGroup) => void;
}

<<<<<<< HEAD

    
//     return (
//         <table className={styles.table}>
//             <thead>
//             <tr>
//                 {columns.map((column) => (
//                     <th key={column.key}>{column.label}</th>
//                 ))}
//                 {showEditButton && <th></th>}
//             </tr>
//             </thead>
//             <tbody>
//             {data.map((item, index) => (
//                 <tr key={index}>
//                     {columns.map((column) => (
//                         <td key={column.key}>{item[column.key]}</td>
//                     ))}
//                     {showEditButton && (
//                         <td>
//                             <Button
//                                 title={'Editar'}
//                                 icon={FaEdit}
//                                 background={'#31b331'}
//                                 width={'100px'} onClick={function (): void {
//                                     throw new Error('Function not implemented.');
//                                 } }                            />
//                         </td>
//                     )}
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     );
// };
const List: React.FC<Props> = ({ showEditButton = true }) => {
    const [data, setData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        await fetch("/api/business-groups") // Chamando a API interna do Next.js
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    }
    const deleteCompany = async (id:string) => {
        const serviceDelete = new BusinessGroupService()
        const response = await serviceDelete.deleteBusinessGroup(id);

        if (response) {
          getData();
        } else {
          console.error('Error deleting');
        }
        
        
    }

    useEffect(() => {
        getData()
    }, []);

  if (loading) return <p>Carregando...</p>;

    return (
    // <div>
    //   <h1>Dados da API:</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
    

    <table className={styles.table}>
    <thead>
    <tr>
        <th>Código</th>
        <th>Grupo/Empresa</th>
        <th>Status</th>
    </tr>
    </thead>
    <tbody>
    {data.map((item: any) => (

        <tr  key={item.codigo}>
            
            <td key={item.id}>{item.id}</td>
            <td key={item.name}>{item.name}</td>
            <td key={item.status}>{item.status ? "Ativo" : " Inativo"}</td>

            {showEditButton && (
                <td>
                    <Button
                        title={'Editar'}
                        icon={FaEdit}
                        background={'#31b331'}
                        width={'100px'} onClick={function (): void {
                            throw new Error('Function not implemented.');
                        } }                            />
                </td>
            )}
            <td>
                    <Button
                        title={'Excluir'}
                        icon={FaEdit}
                        background={'#e00d1e'}
                        onClick={() => deleteCompany(item.id)}
                        width={'100px'} 
                                               
                        />
                </td>
        </tr>
    ))}
    </tbody>
</table>)

}
    
=======
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
>>>>>>> main

export default List;