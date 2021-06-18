import React from 'react';

const UsernameContext = React.createContext({
  username: null,
  setUsername: () => {},
});

export default UsernameContext;
