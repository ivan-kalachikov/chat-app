import React from 'react';

const logIn = ({ token, username }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

const getAuth = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return { username, token };
};

const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: () => {},
});

export default AuthContext;
export { getAuth, logIn, logOut };
