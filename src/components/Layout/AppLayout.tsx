import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../../stores/useAppStore';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  const { sidebarOpen } = useAppStore();

  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={`${styles.mainContent} ${!sidebarOpen ? styles.sidebarClosed : ''}`}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};