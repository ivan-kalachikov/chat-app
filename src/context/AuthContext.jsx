import React from 'react';

const setOrRemove = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

const setAuth = ({ token, username }) => {
  setOrRemove('token', token);
  setOrRemove('username', username);
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
export { getAuth, setAuth };
