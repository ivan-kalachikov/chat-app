import { useContext } from 'react';
import AuthTokenContext from './AuthTokenContext.jsx';
import AuthUsernameContext from './AuthUsernameContext.jsx';
import SocketInstanceContext from './SocketInstanceContext.jsx';

const useAuthToken = () => useContext(AuthTokenContext);
const useAuthUsername = () => useContext(AuthUsernameContext);
const useSocketInstance = () => useContext(SocketInstanceContext);

export {
  AuthTokenContext,
  useAuthToken,
  AuthUsernameContext,
  useAuthUsername,
  SocketInstanceContext,
  useSocketInstance,
};
