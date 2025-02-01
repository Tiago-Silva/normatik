"use client";

import React, {useState} from "react";
import { FaHome, FaUsers, FaBuilding, FaFileAlt, FaCogs, FaFolder, FaChevronRight, FaChevronDown } from "react-icons/fa";
import styles from "./menu.module.css";
import Submenu from "@/app/components/submenu/submenu";

const SidebarMenu = [
    { icon: <FaHome />, label: "Início" },
    { icon: <FaHome />, label: "Guia express" },
    { icon: <FaHome />, label: "Meus pedidos" },
    {
        icon: <FaHome />,
        label: "Cadastro",
        submenus: [
            { icon: <FaUsers />, label: "Grupo/Cliente" },
            { icon: <FaBuilding />, label: "Empresa" },
            { icon: <FaBuilding />, label: "Unidade" },
            { icon: <FaBuilding />, label: "Setor" },
            { icon: <FaBuilding />, label: "Função" },
            { icon: <FaUsers />, label: "Funcionários" },
            { icon: <FaFolder />, label: "Importados" },
            { icon: <FaFileAlt />, label: "Relatórios da estrutura" },
        ],
    },
    { icon: <FaFileAlt />, label: "Certificado Digital" },
    { icon: <FaCogs />, label: "Gestão de Segurança" },
    { icon: <FaFolder />, label: "ArquivoMed" },
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