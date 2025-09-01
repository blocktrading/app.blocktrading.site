import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { toggleSidebar, pageTitle } = useAppStore();
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chiudi dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className={styles.headerTitle}>
          <h1>{pageTitle || 'Trading Dashboard'}</h1>
          <p>Monitor your strategies across multiple exchanges</p>
        </div>
      </div>
      <div className={styles.headerActions}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search strategies or assets" />
        </div>
        <button className={styles.notificationBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <div className={styles.notificationBadge}></div>
        </button>
        
        {/* Profile Dropdown */}
        <div className={styles.profileDropdown} ref={dropdownRef}>
          <button 
            className={styles.profileButton}
            onClick={toggleProfileDropdown}
          >
            <div className={styles.profileAvatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getUserInitials(user?.name || 'User')}</span>
              )}
            </div>
            <svg 
              className={`${styles.chevronIcon} ${isProfileOpen ? styles.chevronOpen : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              fill="none"
            >
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {isProfileOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user?.name}</div>
                  <div className={styles.userEmail}>{user?.email}</div>
                </div>
              </div>
              
              <div className={styles.dropdownDivider}></div>
              
              <div className={styles.dropdownItems}>
                <button className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Profile Settings</span>
                </button>
                
                <button className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  <span>Account Settings</span>
                </button>
                
                <button className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Security</span>
                </button>
                
                <button className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                  <span>Subscription</span>
                </button>
              </div>
              
              <div className={styles.dropdownDivider}></div>
              
              <div className={styles.dropdownFooter}>
                <button 
                  className={styles.logoutButton}
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};