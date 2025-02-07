'use client';

import React, {useState} from 'react';
import styles from './group.module.css';
import HeaderGroup from "@/app/components/group/header";
import Search from "@/app/components/group/seach/search";
import List from "@/app/components/list/list";
import FormGroup from "@/app/components/group/form";

const data = [
    { codigo: '001', nome: 'Empresa A', status: 'Ativo' },
    { codigo: '002', nome: 'Empresa B', status: 'Desativado' },
    { codigo: '003', nome: 'Empresa C', status: 'Ativo' },
    { codigo: '004', nome: 'Empresa D', status: 'Desativado' },
    { codigo: '005', nome: 'Empresa E', status: 'Ativo' },
    { codigo: '006', nome: 'Empresa F', status: 'Desativado' },
    { codigo: '007', nome: 'Empresa G', status: 'Ativo' },
    { codigo: '008', nome: 'Empresa H', status: 'Desativado' },
    { codigo: '009', nome: 'Empresa I', status: 'Ativo' },
    { codigo: '010', nome: 'Empresa J', status: 'Desativado' },
    { codigo: '011', nome: 'Empresa K', status: 'Ativo' },
    { codigo: '012', nome: 'Empresa L', status: 'Desativado' },
    { codigo: '013', nome: 'Empresa M', status: 'Ativo' },
    { codigo: '014', nome: 'Empresa N', status: 'Desativado' },
    { codigo: '015', nome: 'Empresa O', status: 'Ativo' },
    { codigo: '016', nome: 'Empresa P', status: 'Desativado' },
    { codigo: '017', nome: 'Empresa Q', status: 'Ativo' },
    { codigo: '018', nome: 'Empresa R', status: 'Desativado' },
    { codigo: '019', nome: 'Empresa S', status: 'Ativo' },
    { codigo: '020', nome: 'Empresa T', status: 'Desativado' },
    { codigo: '021', nome: 'Empresa U', status: 'Ativo' },
    { codigo: '022', nome: 'Empresa V', status: 'Desativado' },
    { codigo: '023', nome: 'Empresa W', status: 'Ativo' },
    { codigo: '024', nome: 'Empresa X', status: 'Desativado' },
    { codigo: '025', nome: 'Empresa Y', status: 'Ativo' },
    { codigo: '026', nome: 'Empresa Z', status: 'Desativado' },
    { codigo: '027', nome: 'Empresa AA', status: 'Ativo' },
    { codigo: '028', nome: 'Empresa BB', status: 'Desativado' },
    { codigo: '029', nome: 'Empresa CC', status: 'Ativo' },
    { codigo: '030', nome: 'Empresa DD', status: 'Desativado' },
    { codigo: '031', nome: 'Empresa EE', status: 'Ativo' },
    { codigo: '032', nome: 'Empresa FF', status: 'Desativado' },
    { codigo: '033', nome: 'Empresa GG', status: 'Ativo' },
    { codigo: '034', nome: 'Empresa HH', status: 'Desativado' },
    { codigo: '035', nome: 'Empresa II', status: 'Ativo' },
    { codigo: '036', nome: 'Empresa JJ', status: 'Desativado' },
    { codigo: '037', nome: 'Empresa KK', status: 'Ativo' },
    { codigo: '038', nome: 'Empresa LL', status: 'Desativado' },
    { codigo: '039', nome: 'Empresa MM', status: 'Ativo' },
    { codigo: '040', nome: 'Empresa NN', status: 'Desativado' },
    { codigo: '041', nome: 'Empresa OO', status: 'Ativo' },
    { codigo: '042', nome: 'Empresa PP', status: 'Desativado' },
    { codigo: '043', nome: 'Empresa QQ', status: 'Ativo' },
    { codigo: '044', nome: 'Empresa RR', status: 'Desativado' },
    { codigo: '045', nome: 'Empresa SS', status: 'Ativo' },
    { codigo: '046', nome: 'Empresa TT', status: 'Desativado' },
    { codigo: '047', nome: 'Empresa UU', status: 'Ativo' },
    { codigo: '048', nome: 'Empresa VV', status: 'Desativado' },
    { codigo: '049', nome: 'Empresa WW', status: 'Ativo' },
    { codigo: '050', nome: 'Empresa XX', status: 'Desativado' },
];

const columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nome', label: 'Nome' },
    { key: 'status', label: 'Status' },
];

const GroupComponent = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClickButton = () => {
        setShowForm(!showForm);
    };

    return (
        <div className={styles.container}>

            <HeaderGroup isShow={showForm} onClickButton={handleClickButton} />

            {showForm ? (
                <FormGroup onClickButton={handleClickButton} />
            ) : (
                <>
                    <Search />
                    <List/>
                </>
            )}

        </div>
    );
};

export default GroupComponent;