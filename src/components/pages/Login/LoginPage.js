'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../store/UserContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { updateUserInfo } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert('로그인에 성공했습니다.');
        await updateUserInfo();
        navigate(`/`);
      } else {
        alert(`로그인에 실패했습니다: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인중 오류가 발생했습니다.');
    }
  };

  return (
    <main>
      <form onSubmit={onSubmit} className={styles.loginBox}>
        <h2>로그인</h2>
        <input type="email" name="email" placeholder="email" value={email} onChange={onChange} required />
        <input type="password" name="password" placeholder="password" value={password} onChange={onChange} required />
        <button type="submit">LOG IN</button>
      </form>
    </main>
  );
}
