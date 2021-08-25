import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

const checkLogin = async (setIsLoggedIn) => {
  const { loggedIn = false } = await fetch('/api/check-auth').then((res) =>
    res.json(),
  );

  setIsLoggedIn(loggedIn);
};

const login = async () => {
  const { status } = await fetch('/api/login').then((res) => res.json());

  if (status !== 'ok') {
    throw new Error(status);
  }

  navigate('/account/dashboard');
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    checkLogin(setIsLoggedIn);
  }, []);

  if (isLoggedIn) {
    navigate('/account/dashboard', { replace: true });
    return null;
  }

  return <button onClick={login}>Login</button>;
};

export default LoginPage;
