import React from 'react';
import styles from "./header.module.css";
import {AiOutlineMenu} from "react-icons/ai";

const Header = () => {
    return (
        <header className={styles.container}>
            <button className={styles.menuButton}>
                <AiOutlineMenu />
            </button>
            <h1 className={styles.title}>Gerador de PGR</h1>
            <div className={styles.avatar} />
        </header>
    );
};

export default Header;