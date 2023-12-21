import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicHeader.module.css';
import { useNavigate } from 'react-router-dom';
export default function BasicHeader() {
  const navigate = useNavigate();
  const isLoggedin = document.cookie.includes('Authorization');

  const handleLogout = (e) => {
    e.preventDefault();
    // 쿠키에서 Authorization 제거
    document.cookie = 'Authorization=; Max-Age=0';
    alert('로그아웃에 성공했습니다.');
    navigate('/home');
  };

  return (
    <div className={styles.header}>
      <Link to="/home">
        <h2>w-life blog</h2>
      </Link>
      <div className={styles.LoginRegisterDiv}>
        {isLoggedin ? (
          <>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
            <Link to="/account">Account</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
