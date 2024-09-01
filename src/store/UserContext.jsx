import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', status: '' });

  const updateUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/check-auth`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to check auth status');
      }

      const data = await response.json();

      if (data.isLoggedIn) {
        setUserInfo(data.user);
      } else {
        setUserInfo({ name: '', email: '', status: '' });
      }
    } catch (error) {
      setUserInfo({ name: '', email: '', status: '' });
    }
  }, []);

  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  return <UserContext.Provider value={{ userInfo, updateUserInfo }}>{children}</UserContext.Provider>;
};

export { UserContext };
