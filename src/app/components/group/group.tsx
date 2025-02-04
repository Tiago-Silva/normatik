import React from 'react';
import styles from './group.module.css';
import HeaderGroup from "@/app/components/group/header";
import Search from "@/app/components/group/seach/search";

const GroupComponent = () => {
    return (
        <div className={styles.container}>
            <HeaderGroup />
            <Search />
        </div>
    );
};

export default GroupComponent;