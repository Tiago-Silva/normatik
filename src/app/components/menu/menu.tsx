"use client";

import React, {useState} from "react";
import {
    FaHome,
    FaTruck,
    FaClipboardList,
    FaUsers,
    FaBuilding, // Para Empresa (matriz)
    FaRegBuilding, // Para Unidade (filial) - uma construção menor ou diferente
    FaCubes, // Para Setor (departamento) - blocos que formam um todo
    FaFileAlt,
    FaCogs,
    FaFolder,
    FaChevronRight,
    FaChevronDown,
    FaUserPlus,
    FaUserTie,
    FaFileUpload,
    FaScroll,
    FaShieldAlt,
    FaArchive,
} from "react-icons/fa";
import styles from "./menu.module.css";
import Submenu from "@/app/components/submenu/submenu";

const SidebarMenu = [
    {icon: <FaHome/>, label: "Início", path: "/"},
    {icon: <FaTruck/>, label: "Guia express", path: "/guia-express"},
    {icon: <FaClipboardList/>, label: "Meus pedidos", path: "/meus-pedidos"},
    {
        icon: <FaUserPlus/>,
        label: "Cadastro",
        submenus: [
            {icon: <FaUsers/>, label: "Grupo/Cliente", path: "/group"},
            {icon: <FaBuilding/>, label: "Empresa", path: "/company"}, // Ícone alterado
            {icon: <FaRegBuilding/>, label: "Unidade", path: "/cadastro/unidade"}, // Ícone alterado
            {icon: <FaCubes/>, label: "Setor", path: "/sector"}, // Ícone alterado
            {icon: <FaUserTie/>, label: "Função", path: "/function"},
            {icon: <FaUsers/>, label: "Funcionários", path: "/cadastro/funcionarios"},
            {icon: <FaFileUpload/>, label: "Importados", path: "/cadastro/importados"},
            {icon: <FaScroll/>, label: "Relatórios da estrutura", path: "/cadastro/relatorios-estrutura"},
        ],
    },
    {icon: <FaShieldAlt/>, label: "Certificado Digital", path: "/certificado-digital"},
    {icon: <FaCogs/>, label: "Gestão de Segurança", path: "/gestao-seguranca"},
    {icon: <FaArchive/>, label: "ArquivoMed", path: "/arquivomed"},
];

const Menu = () => {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const handleMenuClick = (label: string) => {
        setExpandedMenu((prev) => (prev === label ? null : label));
    };

    return (
        <nav className={styles.nav}>
            <ul>
                {SidebarMenu.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <div
                            className={styles.menuItem}
                            onClick={() => item.submenus && handleMenuClick(item.label)}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                            {item.submenus && (
                                <span className={styles.chevron}>
                                    {expandedMenu === item.label ? <FaChevronDown/> : <FaChevronRight/>}
                                </span>
                            )}
                        </div>
                        {item.submenus && expandedMenu === item.label && (
                            <Submenu submenus={item.submenus}/>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;