import React from 'react';
import styles from './group.module.css';
import GroupComponent from "@/app/components/group/group";

const Group = () => {
    return (
        <div className={styles.container}>

            <GroupComponent />

        </div>
    );
};

export default Group;