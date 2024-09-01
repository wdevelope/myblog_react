import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BasicHeader.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../store/UserContext';

export default function BasicHeader() {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserContext();

  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/user/logout`, {}, { withCredentials: true });
      await updateUserInfo(); // 로그아웃 후 사용자 정보 업데이트
      alert('로그아웃에 성공했습니다.');
      navigate('/home');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/home">
        <h2>w-life blog</h2>
      </Link>
      <div className={styles.LoginRegisterDiv}>
        {userInfo.userId ? (
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
