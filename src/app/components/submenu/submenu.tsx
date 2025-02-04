import React, { useState } from "react";
import Link from "next/link";
import styles from "./submenu.module.css";

interface SubmenuProps {
    submenus: { icon: React.ReactNode; label: string; path: string }[];
}

const Submenu: React.FC<SubmenuProps> = ({ submenus }) => {
    const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);

    const handleSubmenuClick = (label: string) => {
        setSelectedSubmenu(label);
    };

    return (
        <ul className={styles.submenu}>
            {submenus.map((submenu, subIndex) => (
                <li
                    key={subIndex}
                    className={`${styles.submenuItem} ${selectedSubmenu === submenu.label ? styles.selected : ""}`}
                    onClick={() => handleSubmenuClick(submenu.label)}
                >
                    <Link href={submenu.path}>
                        <span className={styles.icon}>{submenu.icon}</span>
                        <span>{submenu.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;