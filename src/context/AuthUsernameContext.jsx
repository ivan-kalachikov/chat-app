import React from 'react';

const AuthUsernameContext = React.createContext({
  authUsername: null,
  setAuthUsername: () => {},
});

export default AuthUsernameContext;
