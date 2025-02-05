import styles from "./layout.module.css";
import { ReactNode } from "react";
import Sidebar from "@/app/components/sidebar/sidebar";
import Header from "@/app/components/header/header";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Header */}
                <Header />

                {/* Content Area */}
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}