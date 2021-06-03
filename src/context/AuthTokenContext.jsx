import React from 'react';

const AuthTokenContext = React.createContext({
  authToken: null,
  setAuthToken: () => {},
});

export default AuthTokenContext;
