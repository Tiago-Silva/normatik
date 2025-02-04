"use client";

import React, {useState} from "react";
import { FaHome, FaUsers, FaBuilding, FaFileAlt, FaCogs, FaFolder, FaChevronRight, FaChevronDown } from "react-icons/fa";
import styles from "./menu.module.css";
import Submenu from "@/app/components/submenu/submenu";

const SidebarMenu = [
    { icon: <FaHome />, label: "Início", path: "/" },
    { icon: <FaHome />, label: "Guia express", path: "/guia-express" },
    { icon: <FaHome />, label: "Meus pedidos", path: "/meus-pedidos" },
    {
        icon: <FaHome />,
        label: "Cadastro",
        submenus: [
            { icon: <FaUsers />, label: "Grupo/Cliente", path: "/group" },
            { icon: <FaBuilding />, label: "Empresa", path: "/cadastro/empresa" },
            { icon: <FaBuilding />, label: "Unidade", path: "/cadastro/unidade" },
            { icon: <FaBuilding />, label: "Setor", path: "/cadastro/setor" },
            { icon: <FaBuilding />, label: "Função", path: "/cadastro/funcao" },
            { icon: <FaUsers />, label: "Funcionários", path: "/cadastro/funcionarios" },
            { icon: <FaFolder />, label: "Importados", path: "/cadastro/importados" },
            { icon: <FaFileAlt />, label: "Relatórios da estrutura", path: "/cadastro/relatorios-estrutura" },
        ],
    },
    { icon: <FaFileAlt />, label: "Certificado Digital", path: "/certificado-digital" },
    { icon: <FaCogs />, label: "Gestão de Segurança", path: "/gestao-seguranca" },
    { icon: <FaFolder />, label: "ArquivoMed", path: "/arquivomed" },
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
                                    {expandedMenu === item.label ? <FaChevronDown /> : <FaChevronRight />}
                                </span>
                            )}
                        </div>
                        {item.submenus && expandedMenu === item.label && (
                            <Submenu submenus={item.submenus} />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;