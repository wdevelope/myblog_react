import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicNav.module.css';

export default function BasicNav() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/home">Home</Link>
          <Link to="/visitor">Visitor</Link>
        </li>
      </ul>
    </div>
  );
}
