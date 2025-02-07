import React, { useEffect, useState } from 'react';
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
    showEditButton?: boolean;
}


    
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
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business-groups") // Chamando a API interna do Next.js
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
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
        </tr>
    ))}
    {/* <tr>{JSON.stringify(data, null, 2)}</tr> */}
    </tbody>
</table>)

}
    

export default List;