import React from 'react';
import AuthContext from './AuthContext.jsx';

const Chat = () => (
  <AuthContext.Consumer>
    {(authData) => (
      <div>
        <h1>Chat window</h1>
        <div>{authData?.auth?.userName}</div>
      </div>
    )}
  </AuthContext.Consumer>
);

export default Chat;
