import React from 'react';
import styles from './AuthLayout.module.css';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authBackground}>
        <div className={styles.backgroundPattern}></div>
        <div className={styles.backgroundGradient}></div>
      </div>
      
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <img src="images/logo.png" alt="BT" />
              </div>
              <span className={styles.logoText}>BlockTrading</span>
            </div>
          </div>
          
          <div className={styles.authContent}>
            {children}
          </div>
          
          <div className={styles.authFooter}>
            <p>&copy; 2024 BlockTrading. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};