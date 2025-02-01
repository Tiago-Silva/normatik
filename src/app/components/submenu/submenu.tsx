import React from "react";
import styles from "./submenu.module.css";

interface SubmenuProps {
    submenus: { icon: React.ReactNode; label: string }[];
}

const Submenu: React.FC<SubmenuProps> = ({ submenus }) => {
    return (
        <ul className={styles.submenu}>
            {submenus.map((submenu, subIndex) => (
                <li key={subIndex} className={styles.submenuItem}>
                    <span className={styles.icon}>{submenu.icon}</span>
                    <span>{submenu.label}</span>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;