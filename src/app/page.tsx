import styles from "./page.module.css";
import Menu from "@/app/components/menu/menu";
import {AiOutlineMenu} from "react-icons/ai";

export default function Home() {

  return (
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>ACSA Gestão</div>
          <Menu />
        </aside>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Header */}
          <header className={styles.header}>
            <button className={styles.menuButton}>
              <AiOutlineMenu />
            </button>
            <h1 className={styles.title}>Indexmed</h1>
            <div className={styles.avatar} />
          </header>

          {/* Content Area */}
          <main className={styles.content}></main>
        </div>
      </div>
  );
}