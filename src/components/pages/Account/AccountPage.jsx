import React from 'react';
import styles from './AccountPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useUserContext } from '../../../store/UserContext';

export default function AccountPage() {
  const { userInfo } = useUserContext();
  const { name, email, status } = userInfo;
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div>
      <header className={styles.userInfoTitle}>
        <h2>유저 정보</h2>
        {status === 'admin' && <button onClick={goToAdmin}>관리자 페이지</button>}
      </header>
      <div className={styles.userInfoBox}>
        <FaUser />
        <span>
          name: {name} (<span>{status}</span>)
        </span>
        <span>email: {email}</span>
      </div>
    </div>
  );
}
