import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

const checkLogin = async (setIsLoggedIn) => {
  const { loggedIn = false } = await fetch('/api/check-auth').then((res) =>
    res.json(),
  );

  setIsLoggedIn(loggedIn);
};

const logout = async () => {
  const { status } = await fetch('/api/logout').then((res) => res.json());

  if (status !== 'ok') {
    throw new Error(status);
  }

  navigate('/account/login');
};

const DashboardPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    checkLogin(setIsLoggedIn);
  }, []);

  if (isLoggedIn === false) {
    navigate('/account/login', { replace: true });
    return null;
  }

  return (
    <>
      <h1>You are logged in user, it's your dashboard</h1>
      <button onClick={logout}>Log Out</button>
    </>
  );
};

export default DashboardPage;
