import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers } from 'react-icons/fa';
import styles from './BasicNav.module.css';

export default function BasicNav() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/home" className={styles.navItem}>
            <div className={styles.icon}>
              <FaHome />
            </div>
            <div>Home</div>
          </Link>
        </li>
        <li>
          <Link to="/visitor" className={styles.navItem}>
            <div className={styles.icon}>
              <FaUsers />
            </div>
            <div>Visitor</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
