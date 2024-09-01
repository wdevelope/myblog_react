import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicNav.module.css';
import DynamicNav from './DynaminNav';

export default function BasicNav() {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/home">
            <div className={styles.homeLi}>home</div>
          </Link>
        </li>
        <li>
          <DynamicNav />
        </li>
        <li className={styles.navVisitor}>
          <Link to="/visitor">
            <div>visitor</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
