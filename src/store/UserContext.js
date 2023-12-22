import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', status: '' });

  const updateUserInfo = async () => {
    const isLoggedIn = document.cookie.includes('Authorization');

    if (!isLoggedIn) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/userinfo`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      setUserInfo({ name: data.name, email: data.email, status: data.status });
    } catch (error) {
      console.log('비로그인 상태');
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  return <UserContext.Provider value={{ userInfo, updateUserInfo }}>{children}</UserContext.Provider>;
};

export { UserContext };
