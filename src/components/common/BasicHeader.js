import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicHeader.module.css';

export default function BasicHeader() {
  return (
    <div className={styles.header}>
      <Link to="/home">
        <h2>w-life blog</h2>
      </Link>
      <div className={styles.LoginRegisterDiv}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
