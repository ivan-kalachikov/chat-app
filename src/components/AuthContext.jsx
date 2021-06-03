import React from 'react';

const AuthContext = React.createContext({
  auth: {
    token: null,
    username: null,
  },
  setAuth: () => {},
});

export default AuthContext;
