import React from 'react';
import styles from "./sidebar.module.css";
import Menu from "@/app/components/menu/menu";

const Sidebar = () => {
    return (
        <aside className={styles.container}>
            <div className={styles.sidebarHeader}>SGSST Gestão</div>
            <Menu />
        </aside>
    );
};

export default Sidebar;