import React from 'react';

const AuthContext = React.createContext({
  auth: {
    authToken: null,
    username: null,
  },
  setAuth: () => {},
});

export default AuthContext;
